-- ============================================
-- Prompt-U Database Schema
-- Complete SQL setup for Supabase
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- PROFILES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- BRAND VOICES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS brand_voices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    tone TEXT NOT NULL,
    description TEXT,
    sample_text TEXT,
    keywords TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT name_length CHECK (char_length(name) <= 100),
    CONSTRAINT description_length CHECK (char_length(description) <= 1000)
);

-- Enable RLS
ALTER TABLE brand_voices ENABLE ROW LEVEL SECURITY;

-- RLS Policies for brand_voices
CREATE POLICY "Users can view own brand voices"
    ON brand_voices FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own brand voices"
    ON brand_voices FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own brand voices"
    ON brand_voices FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own brand voices"
    ON brand_voices FOR DELETE
    USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS brand_voices_user_id_idx ON brand_voices(user_id);
CREATE INDEX IF NOT EXISTS brand_voices_created_at_idx ON brand_voices(created_at DESC);

-- ============================================
-- TEMPLATES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    uses INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT name_length CHECK (char_length(name) <= 100),
    CONSTRAINT content_length CHECK (char_length(content) <= 5000)
);

-- Enable RLS
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for templates
CREATE POLICY "Users can view own templates"
    ON templates FOR SELECT
    USING (auth.uid() = user_id OR is_public = TRUE);

CREATE POLICY "Users can insert own templates"
    ON templates FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates"
    ON templates FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates"
    ON templates FOR DELETE
    USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS templates_user_id_idx ON templates(user_id);
CREATE INDEX IF NOT EXISTS templates_category_idx ON templates(category);
CREATE INDEX IF NOT EXISTS templates_is_public_idx ON templates(is_public);
CREATE INDEX IF NOT EXISTS templates_created_at_idx ON templates(created_at DESC);

-- ============================================
-- PROMPTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS prompts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    quality_score INTEGER NOT NULL CHECK (quality_score >= 0 AND quality_score <= 100),
    brand_voice_id UUID REFERENCES brand_voices(id) ON DELETE SET NULL,
    template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT content_length CHECK (char_length(content) <= 10000)
);

-- Enable RLS
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prompts
CREATE POLICY "Users can view own prompts"
    ON prompts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prompts"
    ON prompts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prompts"
    ON prompts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own prompts"
    ON prompts FOR DELETE
    USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS prompts_user_id_idx ON prompts(user_id);
CREATE INDEX IF NOT EXISTS prompts_brand_voice_id_idx ON prompts(brand_voice_id);
CREATE INDEX IF NOT EXISTS prompts_template_id_idx ON prompts(template_id);
CREATE INDEX IF NOT EXISTS prompts_created_at_idx ON prompts(created_at DESC);
CREATE INDEX IF NOT EXISTS prompts_quality_score_idx ON prompts(quality_score);

-- ============================================
-- PROMPT VERSIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS prompt_versions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE NOT NULL,
    version_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    quality_score INTEGER NOT NULL CHECK (quality_score >= 0 AND quality_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT content_length CHECK (char_length(content) <= 10000),
    UNIQUE(prompt_id, version_number)
);

-- Enable RLS
ALTER TABLE prompt_versions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for prompt_versions
CREATE POLICY "Users can view own prompt versions"
    ON prompt_versions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM prompts
            WHERE prompts.id = prompt_versions.prompt_id
            AND prompts.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own prompt versions"
    ON prompt_versions FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM prompts
            WHERE prompts.id = prompt_versions.prompt_id
            AND prompts.user_id = auth.uid()
        )
    );

-- Indexes for performance
CREATE INDEX IF NOT EXISTS prompt_versions_prompt_id_idx ON prompt_versions(prompt_id);
CREATE INDEX IF NOT EXISTS prompt_versions_created_at_idx ON prompt_versions(created_at DESC);

-- ============================================
-- UPDATED_AT TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brand_voices_updated_at
    BEFORE UPDATE ON brand_voices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at
    BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prompts_updated_at
    BEFORE UPDATE ON prompts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DEFAULT TEMPLATES
-- ============================================

-- Insert default public templates
INSERT INTO templates (user_id, name, category, description, content, is_public, uses) VALUES
(NULL, 'Blog Post Outline', 'content', 'Create a structured outline for a blog post', 
'Create a detailed blog post outline about {{topic}}. Include:
- Catchy headline
- Introduction hook
- 5 main sections with subpoints
- Conclusion with call-to-action

Target audience: {{audience}}
Tone: {{tone}}', TRUE, 156),

(NULL, 'Email Marketing Campaign', 'marketing', 'Generate a complete email marketing sequence',
'Create a 3-email marketing sequence for {{product/service}}.

Email 1: Problem awareness
Email 2: Solution introduction
Email 3: Call-to-action with urgency

Target audience: {{audience}}
Goal: {{goal}}
Tone: Professional yet friendly', TRUE, 203),

(NULL, 'Social Media Post', 'marketing', 'Create engaging social media content',
'Write a {{platform}} post about {{topic}}.

Requirements:
- Hook in first line
- Include relevant hashtags
- Call-to-action at end
- {{word_limit}} words maximum

Tone: {{tone}}
Audience: {{audience}}', TRUE, 342),

(NULL, 'Customer Support Response', 'support', 'Draft professional customer support replies',
'Write a customer support response for this situation:

Customer issue: {{issue}}

Response should:
- Acknowledge the problem empathetically
- Provide clear solution steps
- Offer additional help
- End with professional closing

Tone: Empathetic and helpful', TRUE, 89),

(NULL, 'Product Description', 'sales', 'Write compelling product descriptions',
'Write a product description for {{product_name}}.

Include:
- Attention-grabbing headline
- 3-5 key benefits (not features)
- Use case scenarios
- Social proof element
- Strong call-to-action

Target audience: {{audience}}
Word limit: {{word_limit}} words', TRUE, 178),

(NULL, 'Code Documentation', 'code', 'Generate clear code documentation',
'Create documentation for this {{language}} code:

```
{{code}}
```

Include:
- Purpose and functionality
- Parameters and return values
- Usage examples
- Edge cases and limitations

Format: Markdown', TRUE, 67);

-- ============================================
-- ANALYTICS VIEWS
-- ============================================

-- View for user analytics
CREATE OR REPLACE VIEW user_analytics AS
SELECT 
    p.user_id,
    COUNT(DISTINCT p.id) as total_prompts,
    ROUND(AVG(p.quality_score)) as avg_quality_score,
    COUNT(DISTINCT p.template_id) as templates_used,
    COUNT(DISTINCT bv.id) as brand_voices_count,
    MAX(p.created_at) as last_prompt_date
FROM prompts p
LEFT JOIN brand_voices bv ON bv.user_id = p.user_id
GROUP BY p.user_id;

-- ============================================
-- SECURITY FUNCTIONS
-- ============================================

-- Function to check if user owns a resource
CREATE OR REPLACE FUNCTION user_owns_resource(resource_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN auth.uid() = resource_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Prompt-U database schema created successfully!';
    RAISE NOTICE '📊 Tables created: profiles, brand_voices, templates, prompts, prompt_versions';
    RAISE NOTICE '🔒 Row Level Security enabled on all tables';
    RAISE NOTICE '📝 Default templates inserted';
    RAISE NOTICE '🎯 Ready for deployment!';
END $$;

