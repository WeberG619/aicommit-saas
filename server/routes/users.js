const express = require('express');
const { supabaseAdmin } = require('../services/supabase');
const { authenticate, requireTeamPlan } = require('../middleware/auth');
const { logger } = require('../utils/logger');

const router = express.Router();

// Get current user profile
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = req.user;
    
    res.json({
      id: user.id,
      email: user.email,
      profile: user.profile,
      subscription: user.subscription
    });
  } catch (error) {
    logger.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

// Update user profile
router.put('/me', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, company, timezone } = req.body;

    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .update({
        name,
        company,
        timezone,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.json(profile);
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get usage statistics
router.get('/usage', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const currentMonth = new Date().toISOString().slice(0, 7);

    const { data: usage } = await supabaseAdmin
      .from('usage_stats')
      .select('*')
      .eq('user_id', userId)
      .eq('month', currentMonth)
      .single();

    // Get historical data
    const { data: history } = await supabaseAdmin
      .from('usage_stats')
      .select('month, commits_generated, tokens_used')
      .eq('user_id', userId)
      .order('month', { ascending: false })
      .limit(6);

    res.json({
      current: usage || { commits_generated: 0, tokens_used: 0 },
      history: history || []
    });
  } catch (error) {
    logger.error('Usage stats error:', error);
    res.status(500).json({ error: 'Failed to get usage statistics' });
  }
});

// Team management (Team/Enterprise only)
router.get('/team', authenticate, requireTeamPlan(), async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: team } = await supabaseAdmin
      .from('team_members')
      .select('*, profiles(*)')
      .eq('owner_id', userId);

    res.json({
      members: team || [],
      limit: req.user.subscription.plan === 'team' ? 10 : -1
    });
  } catch (error) {
    logger.error('Get team error:', error);
    res.status(500).json({ error: 'Failed to get team members' });
  }
});

// Invite team member
router.post('/team/invite', authenticate, requireTeamPlan(), async (req, res) => {
  try {
    const { email, role = 'member' } = req.body;
    const ownerId = req.user.id;

    // Check team size limit
    if (req.user.subscription.plan === 'team') {
      const { count } = await supabaseAdmin
        .from('team_members')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', ownerId);

      if (count >= 10) {
        return res.status(400).json({ error: 'Team size limit reached' });
      }
    }

    // Create invitation
    const { data: invitation, error } = await supabaseAdmin
      .from('team_invitations')
      .insert({
        owner_id: ownerId,
        email,
        role,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    // TODO: Send invitation email

    res.status(201).json({
      message: 'Invitation sent',
      invitation
    });
  } catch (error) {
    logger.error('Team invite error:', error);
    res.status(500).json({ error: 'Failed to send invitation' });
  }
});

// Remove team member
router.delete('/team/:memberId', authenticate, requireTeamPlan(), async (req, res) => {
  try {
    const { memberId } = req.params;
    const ownerId = req.user.id;

    const { error } = await supabaseAdmin
      .from('team_members')
      .delete()
      .eq('member_id', memberId)
      .eq('owner_id', ownerId);

    if (error) {
      throw error;
    }

    res.json({ message: 'Team member removed' });
  } catch (error) {
    logger.error('Remove team member error:', error);
    res.status(500).json({ error: 'Failed to remove team member' });
  }
});

// Get API keys
router.get('/api-keys', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: apiKeys } = await supabaseAdmin
      .from('api_keys')
      .select('id, name, key_preview, created_at, last_used')
      .eq('user_id', userId)
      .eq('is_active', true);

    res.json(apiKeys || []);
  } catch (error) {
    logger.error('Get API keys error:', error);
    res.status(500).json({ error: 'Failed to get API keys' });
  }
});

// Create API key
router.post('/api-keys', authenticate, async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    // Generate API key
    const apiKey = `gca_${generateRandomString(32)}`;
    const keyPreview = `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`;

    const { data: newKey, error } = await supabaseAdmin
      .from('api_keys')
      .insert({
        user_id: userId,
        name,
        key_hash: await hashApiKey(apiKey),
        key_preview,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      ...newKey,
      key: apiKey // Only return full key on creation
    });
  } catch (error) {
    logger.error('Create API key error:', error);
    res.status(500).json({ error: 'Failed to create API key' });
  }
});

// Delete API key
router.delete('/api-keys/:keyId', authenticate, async (req, res) => {
  try {
    const { keyId } = req.params;
    const userId = req.user.id;

    const { error } = await supabaseAdmin
      .from('api_keys')
      .update({ is_active: false })
      .eq('id', keyId)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    res.json({ message: 'API key deleted' });
  } catch (error) {
    logger.error('Delete API key error:', error);
    res.status(500).json({ error: 'Failed to delete API key' });
  }
});

// Helper functions
function generateRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function hashApiKey(key) {
  const bcrypt = require('bcryptjs');
  return bcrypt.hash(key, 10);
}

module.exports = router;