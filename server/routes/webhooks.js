const express = require('express');
const { handleWebhook } = require('../services/stripe');
const { supabaseAdmin } = require('../services/supabase');
const { logger } = require('../utils/logger');

const router = express.Router();

// Stripe webhook handler
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];

  try {
    const event = await handleWebhook(req.body, signature);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutComplete(event.data.object);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    logger.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook error' });
  }
});

// Handle successful checkout
async function handleCheckoutComplete(session) {
  try {
    const customerId = session.customer;
    const subscriptionId = session.subscription;

    // Get user by Stripe customer ID
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (!profile) {
      throw new Error(`No user found for customer ${customerId}`);
    }

    logger.info('Checkout completed', { 
      userId: profile.id, 
      customerId, 
      subscriptionId 
    });
  } catch (error) {
    logger.error('Checkout complete handler error:', error);
    throw error;
  }
}

// Handle subscription created
async function handleSubscriptionCreated(subscription) {
  try {
    const customerId = subscription.customer;
    const plan = getPlanFromPriceId(subscription.items.data[0].price.id);

    // Get user by Stripe customer ID
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();

    if (!profile) {
      throw new Error(`No user found for customer ${customerId}`);
    }

    // Create or update subscription record
    const { error } = await supabaseAdmin
      .from('subscriptions')
      .upsert({
        user_id: profile.id,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: customerId,
        plan,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null
      });

    if (error) {
      throw error;
    }

    // Initialize usage stats for the month
    const currentMonth = new Date().toISOString().slice(0, 7);
    await supabaseAdmin
      .from('usage_stats')
      .upsert({
        user_id: profile.id,
        month: currentMonth,
        commits_generated: 0,
        tokens_used: 0
      });

    logger.info('Subscription created', { 
      userId: profile.id, 
      plan, 
      subscriptionId: subscription.id 
    });
  } catch (error) {
    logger.error('Subscription created handler error:', error);
    throw error;
  }
}

// Handle subscription updated
async function handleSubscriptionUpdated(subscription) {
  try {
    const plan = getPlanFromPriceId(subscription.items.data[0].price.id);

    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({
        plan,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      throw error;
    }

    logger.info('Subscription updated', { 
      subscriptionId: subscription.id,
      plan,
      status: subscription.status
    });
  } catch (error) {
    logger.error('Subscription updated handler error:', error);
    throw error;
  }
}

// Handle subscription deleted
async function handleSubscriptionDeleted(subscription) {
  try {
    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({
        status: 'canceled',
        canceled_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      throw error;
    }

    logger.info('Subscription deleted', { subscriptionId: subscription.id });
  } catch (error) {
    logger.error('Subscription deleted handler error:', error);
    throw error;
  }
}

// Handle successful payment
async function handlePaymentSucceeded(invoice) {
  try {
    // Record payment
    await supabaseAdmin
      .from('payments')
      .insert({
        stripe_invoice_id: invoice.id,
        stripe_subscription_id: invoice.subscription,
        amount: invoice.amount_paid / 100,
        currency: invoice.currency,
        status: 'succeeded',
        paid_at: new Date(invoice.status_transitions.paid_at * 1000).toISOString()
      });

    logger.info('Payment succeeded', { 
      invoiceId: invoice.id,
      amount: invoice.amount_paid / 100
    });
  } catch (error) {
    logger.error('Payment succeeded handler error:', error);
    throw error;
  }
}

// Handle failed payment
async function handlePaymentFailed(invoice) {
  try {
    // Record failed payment
    await supabaseAdmin
      .from('payments')
      .insert({
        stripe_invoice_id: invoice.id,
        stripe_subscription_id: invoice.subscription,
        amount: invoice.amount_due / 100,
        currency: invoice.currency,
        status: 'failed',
        failure_reason: invoice.last_finalization_error?.message
      });

    // Update subscription status
    await supabaseAdmin
      .from('subscriptions')
      .update({
        status: 'past_due',
        payment_failed_at: new Date().toISOString()
      })
      .eq('stripe_subscription_id', invoice.subscription);

    logger.info('Payment failed', { 
      invoiceId: invoice.id,
      amount: invoice.amount_due / 100
    });

    // TODO: Send payment failed email notification
  } catch (error) {
    logger.error('Payment failed handler error:', error);
    throw error;
  }
}

// Helper function to get plan name from price ID
function getPlanFromPriceId(priceId) {
  const priceMap = {
    [process.env.STRIPE_PRICE_INDIVIDUAL]: 'individual',
    [process.env.STRIPE_PRICE_TEAM]: 'team',
    [process.env.STRIPE_PRICE_ENTERPRISE]: 'enterprise'
  };
  
  return priceMap[priceId] || 'individual';
}

module.exports = router;