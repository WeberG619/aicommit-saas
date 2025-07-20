const express = require('express');
const { 
  createCheckoutSession, 
  createPortalSession, 
  cancelSubscription,
  updateSubscription,
  PRICE_IDS 
} = require('../services/stripe');
const { authenticate } = require('../middleware/auth');
const { logger } = require('../utils/logger');

const router = express.Router();

// Create checkout session for new subscription
router.post('/checkout', authenticate, async (req, res) => {
  try {
    const { plan } = req.body;
    const user = req.user;

    if (!['individual', 'team', 'enterprise'].includes(plan)) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    if (user.subscription?.status === 'active') {
      return res.status(400).json({ error: 'Already have an active subscription' });
    }

    const priceId = PRICE_IDS[plan];
    const successUrl = `${process.env.FRONTEND_URL}/dashboard?success=true`;
    const cancelUrl = `${process.env.FRONTEND_URL}/pricing?cancelled=true`;

    const session = await createCheckoutSession(
      user.profile.stripe_customer_id,
      priceId,
      successUrl,
      cancelUrl
    );

    res.json({ checkoutUrl: session.url });
  } catch (error) {
    logger.error('Checkout session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Update subscription plan
router.post('/update', authenticate, async (req, res) => {
  try {
    const { newPlan } = req.body;
    const user = req.user;

    if (!user.subscription || user.subscription.status !== 'active') {
      return res.status(400).json({ error: 'No active subscription found' });
    }

    if (!['individual', 'team', 'enterprise'].includes(newPlan)) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    const newPriceId = PRICE_IDS[newPlan];
    const updatedSubscription = await updateSubscription(
      user.subscription.stripe_subscription_id,
      newPriceId
    );

    res.json({ 
      message: 'Subscription updated successfully',
      subscription: updatedSubscription 
    });
  } catch (error) {
    logger.error('Update subscription error:', error);
    res.status(500).json({ error: 'Failed to update subscription' });
  }
});

// Cancel subscription
router.post('/cancel', authenticate, async (req, res) => {
  try {
    const user = req.user;

    if (!user.subscription || user.subscription.status !== 'active') {
      return res.status(400).json({ error: 'No active subscription found' });
    }

    const cancelledSubscription = await cancelSubscription(
      user.subscription.stripe_subscription_id
    );

    res.json({ 
      message: 'Subscription will be cancelled at the end of the billing period',
      cancelAt: cancelledSubscription.cancel_at 
    });
  } catch (error) {
    logger.error('Cancel subscription error:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// Create customer portal session
router.post('/portal', authenticate, async (req, res) => {
  try {
    const user = req.user;
    const returnUrl = `${process.env.FRONTEND_URL}/dashboard`;

    const session = await createPortalSession(
      user.profile.stripe_customer_id,
      returnUrl
    );

    res.json({ portalUrl: session.url });
  } catch (error) {
    logger.error('Portal session error:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

// Get current subscription status
router.get('/status', authenticate, async (req, res) => {
  try {
    const user = req.user;

    if (!user.subscription) {
      return res.json({ 
        hasSubscription: false,
        status: 'none',
        plan: null 
      });
    }

    res.json({
      hasSubscription: true,
      status: user.subscription.status,
      plan: user.subscription.plan,
      currentPeriodEnd: user.subscription.current_period_end,
      cancelAtPeriodEnd: user.subscription.cancel_at_period_end
    });
  } catch (error) {
    logger.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to get subscription status' });
  }
});

module.exports = router;