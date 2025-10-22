-- PromptGenius Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  tier VARCHAR(50) DEFAULT 'tier1' CHECK (tier IN ('tier1', 'tier2', 'tier3', 'monthly')),
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  industry VARCHAR(100) DEFAULT 'general',
  quality_score INTEGER DEFAULT 0 CHECK (quality_score >= 0 AND quality_score <= 100),
  version INTEGER DEFAULT 1,
  parent_id UUID REFERENCES prompts(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  industry VARCHAR(100) DEFAULT 'general',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Brand Voices table
CREATE TABLE IF NOT EXISTS brand_voices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  guidelines TEXT,
  examples TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_prompts_user_id ON prompts(user_id);
CREATE INDEX IF NOT EXISTS idx_prompts_parent_id ON prompts(parent_id);
CREATE INDEX IF NOT EXISTS idx_templates_user_id ON templates(user_id);
CREATE INDEX IF NOT EXISTS idx_templates_is_public ON templates(is_public);
CREATE INDEX IF NOT EXISTS idx_brand_voices_user_id ON brand_voices(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompts_updated_at BEFORE UPDATE ON prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brand_voices_updated_at BEFORE UPDATE ON brand_voices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_voices ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users (users can only see their own data)
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for prompts
CREATE POLICY "Users can view own prompts" ON prompts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own prompts" ON prompts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prompts" ON prompts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own prompts" ON prompts
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for templates
CREATE POLICY "Users can view public and own templates" ON templates
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create own templates" ON templates
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates" ON templates
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates" ON templates
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for brand_voices
CREATE POLICY "Users can view own brand voices" ON brand_voices
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own brand voices" ON brand_voices
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own brand voices" ON brand_voices
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own brand voices" ON brand_voices
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for teams
CREATE POLICY "Users can view teams they own" ON teams
  FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can create teams" ON teams
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own teams" ON teams
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own teams" ON teams
  FOR DELETE USING (auth.uid() = owner_id);

-- RLS Policies for team_members
CREATE POLICY "Users can view team members of their teams" ON team_members
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM team_members WHERE team_id = team_members.team_id
    )
  );

CREATE POLICY "Team owners can manage members" ON team_members
  FOR ALL USING (
    auth.uid() IN (
      SELECT owner_id FROM teams WHERE id = team_members.team_id
    )
  );

