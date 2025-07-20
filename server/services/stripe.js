const Stripe = require('stripe');
const { logger } = require('../utils/logger');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

const PRICE_IDS = {
  individual: process.env.STRIPE_PRICE_INDIVIDUAL,
  team: process.env.STRIPE_PRICE_TEAM,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE
};

const PLAN_FEATURES = {
  individual: {
    name: 'Individual',
    commitLimit: -1, // unlimited
    teamMembers: 1,
    customStyles: 5,
    analytics: 'basic',
    support: 'email'
  },
  team: {
    name: 'Team',
    commitLimit: -1,
    teamMembers: 10,
    customStyles: 20,
    analytics: 'advanced',
    support: 'priority'
  },
  enterprise: {
    name: 'Enterprise',
    commitLimit: -1,
    teamMembers: -1, // unlimited
    customStyles: -1,
    analytics: 'enterprise',
    support: 'dedicated'
  }
};

async function createCustomer(email, name, userId) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        userId
      }
    });
    
    logger.info('Created Stripe customer', { customerId: customer.id, userId });
    return customer;
  } catch (error) {
    logger.error('Error creating Stripe customer:', error);
    throw error;
  }
}

async function createSubscription(customerId, priceId, trialDays = 14) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: trialDays,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent']
    });
    
    logger.info('Created subscription', { 
      subscriptionId: subscription.id, 
      customerId,
      status: subscription.status 
    });
    
    return subscription;
  } catch (error) {
    logger.error('Error creating subscription:', error);
    throw error;
  }
}

async function createCheckoutSession(customerId, priceId, successUrl, cancelUrl) {
  try {
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      subscription_data: {
        trial_period_days: 14
      }
    });
    
    logger.info('Created checkout session', { sessionId: session.id, customerId });
    return session;
  } catch (error) {
    logger.error('Error creating checkout session:', error);
    throw error;
  }
}

async function cancelSubscription(subscriptionId) {
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    });
    
    logger.info('Cancelled subscription', { subscriptionId });
    return subscription;
  } catch (error) {
    logger.error('Error cancelling subscription:', error);
    throw error;
  }
}

async function updateSubscription(subscriptionId, newPriceId) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: newPriceId
      }],
      proration_behavior: 'create_prorations'
    });
    
    logger.info('Updated subscription', { subscriptionId, newPriceId });
    return updatedSubscription;
  } catch (error) {
    logger.error('Error updating subscription:', error);
    throw error;
  }
}

async function createPortalSession(customerId, returnUrl) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    });
    
    return session;
  } catch (error) {
    logger.error('Error creating portal session:', error);
    throw error;
  }
}

async function handleWebhook(payload, signature) {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    logger.info('Webhook received', { type: event.type, id: event.id });
    
    return event;
  } catch (error) {
    logger.error('Webhook signature verification failed:', error);
    throw error;
  }
}

module.exports = {
  stripe,
  PRICE_IDS,
  PLAN_FEATURES,
  createCustomer,
  createSubscription,
  createCheckoutSession,
  cancelSubscription,
  updateSubscription,
  createPortalSession,
  handleWebhook
};