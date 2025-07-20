const jwt = require('jsonwebtoken');
const { supabaseAdmin } = require('../services/supabase');
const { logger } = require('../utils/logger');

async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from Supabase
    const { data: user, error } = await supabaseAdmin.auth.admin.getUserById(decoded.sub);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Check subscription status
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*, subscriptions(*)')
      .eq('id', user.id)
      .single();

    req.user = {
      id: user.id,
      email: user.email,
      profile,
      subscription: profile?.subscriptions?.[0] || null
    };

    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

function requireSubscription(allowedPlans = ['individual', 'team', 'enterprise']) {
  return (req, res, next) => {
    if (!req.user.subscription || req.user.subscription.status !== 'active') {
      return res.status(403).json({ error: 'Active subscription required' });
    }

    if (!allowedPlans.includes(req.user.subscription.plan)) {
      return res.status(403).json({ 
        error: 'Upgrade required', 
        requiredPlans: allowedPlans 
      });
    }

    next();
  };
}

function requireTeamPlan() {
  return requireSubscription(['team', 'enterprise']);
}

function requireEnterprisePlan() {
  return requireSubscription(['enterprise']);
}

module.exports = {
  authenticate,
  requireSubscription,
  requireTeamPlan,
  requireEnterprisePlan
};