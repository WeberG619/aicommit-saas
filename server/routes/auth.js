const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { supabaseAdmin } = require('../services/supabase');
const { createCustomer } = require('../services/stripe');
const { logger } = require('../utils/logger');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError) {
      logger.error('Auth creation error:', authError);
      return res.status(400).json({ error: authError.message });
    }

    // Create Stripe customer
    const stripeCustomer = await createCustomer(email, name, authUser.user.id);

    // Create user profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authUser.user.id,
        email,
        name,
        stripe_customer_id: stripeCustomer.id
      })
      .select()
      .single();

    if (profileError) {
      logger.error('Profile creation error:', profileError);
      // Cleanup: delete auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
      return res.status(400).json({ error: 'Failed to create user profile' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { sub: authUser.user.id, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      user: {
        id: profile.id,
        email: profile.email,
        name: profile.name
      },
      token
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in with Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get user profile
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*, subscriptions(*)')
      .eq('id', authData.user.id)
      .single();

    // Generate JWT token
    const token = jwt.sign(
      { sub: authData.user.id, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      user: {
        id: profile.id,
        email: profile.email,
        name: profile.name,
        subscription: profile.subscriptions?.[0] || null
      },
      token
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await supabaseAdmin.auth.admin.signOut(decoded.sub);
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Password reset request
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    logger.error('Password reset error:', error);
    res.status(500).json({ error: 'Failed to send reset email' });
  }
});

// Update password
router.post('/update-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    const { error } = await supabaseAdmin.auth.updateUser({
      password
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    logger.error('Password update error:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

module.exports = router;