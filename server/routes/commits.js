const express = require('express');
const { generateCommitMessage, analyzeCommitHistory, COMMIT_STYLES } = require('../services/openai');
const { supabaseAdmin } = require('../services/supabase');
const { authenticate, requireSubscription } = require('../middleware/auth');
const { logger } = require('../utils/logger');

const router = express.Router();

// Generate commit message
router.post('/generate', authenticate, requireSubscription(), async (req, res) => {
  try {
    const { diff, style = 'conventional', customInstructions = '' } = req.body;
    const userId = req.user.id;

    if (!diff) {
      return res.status(400).json({ error: 'Git diff is required' });
    }

    // Check rate limits based on plan
    const { data: usage } = await supabaseAdmin
      .from('usage_stats')
      .select('commits_generated')
      .eq('user_id', userId)
      .eq('month', new Date().toISOString().slice(0, 7))
      .single();

    // Generate commit message
    const result = await generateCommitMessage(diff, style, customInstructions);

    // Record usage
    await supabaseAdmin.from('commit_history').insert({
      user_id: userId,
      message: result.message,
      style,
      diff_preview: diff.substring(0, 500),
      tokens_used: result.tokensUsed
    });

    // Update usage stats
    await supabaseAdmin.rpc('increment_usage', {
      user_id: userId,
      field: 'commits_generated'
    });

    res.json({
      message: result.message,
      style: result.style,
      tokensUsed: result.tokensUsed
    });
  } catch (error) {
    logger.error('Commit generation error:', error);
    res.status(500).json({ error: 'Failed to generate commit message' });
  }
});

// Get commit history
router.get('/history', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 50, offset = 0 } = req.query;

    const { data: commits, error } = await supabaseAdmin
      .from('commit_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    res.json({
      commits,
      total: commits.length,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    logger.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch commit history' });
  }
});

// Analyze commit patterns
router.post('/analyze', authenticate, requireSubscription(['team', 'enterprise']), async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 100 } = req.body;

    // Get recent commits
    const { data: commits } = await supabaseAdmin
      .from('commit_history')
      .select('message, style, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (!commits || commits.length === 0) {
      return res.status(400).json({ error: 'No commits found to analyze' });
    }

    // Analyze patterns
    const analysis = await analyzeCommitHistory(commits, userId);

    // Save analysis
    await supabaseAdmin.from('analytics').insert({
      user_id: userId,
      type: 'commit_analysis',
      data: analysis
    });

    res.json(analysis);
  } catch (error) {
    logger.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze commits' });
  }
});

// Get available commit styles
router.get('/styles', authenticate, async (req, res) => {
  const userStyles = req.user.subscription?.plan === 'enterprise' ? 
    await getUserCustomStyles(req.user.id) : [];

  res.json({
    default: Object.keys(COMMIT_STYLES),
    custom: userStyles
  });
});

// Create custom style (enterprise only)
router.post('/styles', authenticate, requireSubscription(['enterprise']), async (req, res) => {
  try {
    const { name, prompt, examples } = req.body;
    const userId = req.user.id;

    const { data: style, error } = await supabaseAdmin
      .from('custom_styles')
      .insert({
        user_id: userId,
        name,
        prompt,
        examples
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json(style);
  } catch (error) {
    logger.error('Style creation error:', error);
    res.status(500).json({ error: 'Failed to create custom style' });
  }
});

// Helper function to get user custom styles
async function getUserCustomStyles(userId) {
  const { data: styles } = await supabaseAdmin
    .from('custom_styles')
    .select('*')
    .eq('user_id', userId);
  
  return styles || [];
}

module.exports = router;