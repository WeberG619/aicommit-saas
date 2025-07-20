-- Git Commit AI SaaS Database Schema
-- Using Supabase (PostgreSQL)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  company TEXT,
  timezone TEXT DEFAULT 'UTC',
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('individual', 'team', 'enterprise')),
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  payment_failed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Commit history table
CREATE TABLE commit_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  style TEXT NOT NULL,
  diff_preview TEXT,
  tokens_used INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Usage statistics table
CREATE TABLE usage_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  month TEXT NOT NULL, -- Format: YYYY-MM
  commits_generated INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month)
);

-- Team members table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(owner_id, member_id)
);

-- Team invitations table
CREATE TABLE team_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  token TEXT UNIQUE DEFAULT uuid_generate_v4()::TEXT,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API keys table
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  key_preview TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_used TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Custom commit styles (enterprise only)
CREATE TABLE custom_styles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  prompt TEXT NOT NULL,
  examples TEXT,
  is_shared BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Analytics table
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_invoice_id TEXT UNIQUE NOT NULL,
  stripe_subscription_id TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL,
  status TEXT NOT NULL,
  failure_reason TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_commit_history_user_id ON commit_history(user_id);
CREATE INDEX idx_commit_history_created_at ON commit_history(created_at DESC);
CREATE INDEX idx_usage_stats_user_month ON usage_stats(user_id, month);
CREATE INDEX idx_team_members_owner_id ON team_members(owner_id);
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id) WHERE is_active = TRUE;

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE commit_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Commit history policies
CREATE POLICY "Users can view own commits" ON commit_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own commits" ON commit_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usage stats policies
CREATE POLICY "Users can view own usage" ON usage_stats
  FOR SELECT USING (auth.uid() = user_id);

-- Team members policies
CREATE POLICY "Users can view own team" ON team_members
  FOR SELECT USING (auth.uid() = owner_id OR auth.uid() = member_id);

-- API keys policies
CREATE POLICY "Users can manage own API keys" ON api_keys
  FOR ALL USING (auth.uid() = user_id);

-- Custom styles policies
CREATE POLICY "Users can manage own styles" ON custom_styles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view shared styles" ON custom_styles
  FOR SELECT USING (is_shared = TRUE);

-- Analytics policies
CREATE POLICY "Users can view own analytics" ON analytics
  FOR SELECT USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION increment_usage(user_id UUID, field TEXT)
RETURNS VOID AS $$
DECLARE
  current_month TEXT;
BEGIN
  current_month := TO_CHAR(NOW(), 'YYYY-MM');
  
  INSERT INTO usage_stats (user_id, month, commits_generated, tokens_used)
  VALUES (user_id, current_month, 
    CASE WHEN field = 'commits_generated' THEN 1 ELSE 0 END,
    CASE WHEN field = 'tokens_used' THEN 1 ELSE 0 END
  )
  ON CONFLICT (user_id, month) DO UPDATE
  SET 
    commits_generated = usage_stats.commits_generated + 
      CASE WHEN field = 'commits_generated' THEN 1 ELSE 0 END,
    tokens_used = usage_stats.tokens_used + 
      CASE WHEN field = 'tokens_used' THEN 1 ELSE 0 END,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_usage_stats_updated_at BEFORE UPDATE ON usage_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_custom_styles_updated_at BEFORE UPDATE ON custom_styles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();