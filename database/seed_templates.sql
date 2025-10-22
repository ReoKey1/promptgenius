-- Seed data: Public prompt templates
-- Run this after schema.sql to populate initial templates

INSERT INTO templates (title, description, content, category, industry, is_public) VALUES

-- Marketing Templates
('Blog Post Outline', 'Generate a comprehensive blog post outline on any topic', 'You are an expert content strategist. Create a detailed blog post outline for the topic: [TOPIC].

Include:
- Compelling headline (3 options)
- Introduction hook
- 5-7 main sections with subpoints
- Conclusion with call-to-action
- SEO keywords to target

Target audience: [AUDIENCE]
Tone: [TONE]
Word count goal: [WORD_COUNT]', 'content', 'marketing', true),

('Social Media Post', 'Create engaging social media content', 'You are a social media expert. Create a compelling social media post for [PLATFORM].

Topic: [TOPIC]
Goal: [GOAL]

Requirements:
- Attention-grabbing hook
- Clear value proposition
- Call-to-action
- Relevant hashtags (3-5)
- Emoji usage (if appropriate)

Tone: [TONE]
Character limit: [LIMIT]', 'social-media', 'marketing', true),

('Email Marketing Campaign', 'Design a complete email marketing sequence', 'You are an email marketing specialist. Create a 3-email welcome sequence for [PRODUCT/SERVICE].

For each email include:
- Subject line (2 options)
- Preview text
- Email body
- Call-to-action

Target audience: [AUDIENCE]
Goal: [GOAL]
Brand voice: [VOICE]', 'email', 'marketing', true),

('Product Description', 'Write compelling product descriptions', 'You are a conversion copywriter. Write a product description for:

Product: [PRODUCT_NAME]
Features: [KEY_FEATURES]
Benefits: [MAIN_BENEFITS]
Target customer: [CUSTOMER]

Include:
- Attention-grabbing headline
- Problem statement
- Solution (how product helps)
- Key features and benefits
- Social proof element
- Call-to-action

Tone: [TONE]
Length: [LENGTH]', 'ecommerce', 'marketing', true),

-- Content Creation Templates
('YouTube Video Script', 'Create engaging YouTube video scripts', 'You are a YouTube content creator. Write a video script for:

Topic: [TOPIC]
Video length: [DURATION]
Target audience: [AUDIENCE]

Structure:
- Hook (first 10 seconds)
- Introduction
- Main content (3-5 key points)
- Conclusion
- Call-to-action (subscribe, like, comment)

Include timestamps and B-roll suggestions.
Tone: [TONE]', 'video', 'content', true),

('Podcast Episode Outline', 'Plan engaging podcast episodes', 'You are a podcast producer. Create an episode outline for:

Topic: [TOPIC]
Episode length: [DURATION]
Guest: [GUEST_NAME] (if applicable)

Include:
- Episode title
- Hook/teaser
- Introduction
- Main segments (with time estimates)
- Questions to ask
- Key takeaways
- Outro/call-to-action

Format: [FORMAT]', 'audio', 'content', true),

-- Business Templates
('Business Proposal', 'Create professional business proposals', 'You are a business consultant. Write a business proposal for:

Client: [CLIENT_NAME]
Project: [PROJECT_DESCRIPTION]
Budget: [BUDGET_RANGE]

Include:
- Executive summary
- Problem statement
- Proposed solution
- Scope of work
- Timeline
- Pricing
- Terms and conditions
- Next steps

Tone: Professional and persuasive', 'proposal', 'business', true),

('Meeting Agenda', 'Structure productive meetings', 'You are a productivity expert. Create a meeting agenda for:

Meeting type: [TYPE]
Duration: [DURATION]
Attendees: [ATTENDEES]
Main objective: [OBJECTIVE]

Include:
- Meeting purpose
- Agenda items (with time allocations)
- Discussion points
- Decision items
- Action items template
- Next steps

Format: Clear and actionable', 'productivity', 'business', true),

-- Technical Templates
('Code Review Checklist', 'Comprehensive code review guidelines', 'You are a senior software engineer. Create a code review checklist for [PROGRAMMING_LANGUAGE].

Include checks for:
- Code quality and readability
- Performance optimization
- Security vulnerabilities
- Error handling
- Testing coverage
- Documentation
- Best practices

Format: Checklist with explanations', 'development', 'technology', true),

('API Documentation', 'Document APIs clearly', 'You are a technical writer. Create API documentation for:

Endpoint: [ENDPOINT]
Method: [HTTP_METHOD]
Purpose: [PURPOSE]

Include:
- Endpoint description
- Request parameters
- Request body (if applicable)
- Response format
- Status codes
- Error handling
- Example requests and responses
- Authentication requirements

Format: Clear and developer-friendly', 'documentation', 'technology', true),

-- Creative Templates
('Story Outline', 'Create compelling story structures', 'You are a creative writer. Develop a story outline for:

Genre: [GENRE]
Theme: [THEME]
Target audience: [AUDIENCE]

Include:
- Premise (one sentence)
- Main characters (with brief descriptions)
- Setting
- Plot structure (beginning, middle, end)
- Key plot points
- Conflict and resolution
- Character arcs

Tone: [TONE]', 'creative-writing', 'creative', true),

('Character Development', 'Build deep, believable characters', 'You are a character development expert. Create a detailed character profile for:

Character name: [NAME]
Role: [PROTAGONIST/ANTAGONIST/SUPPORTING]
Story: [STORY_CONTEXT]

Include:
- Physical description
- Personality traits
- Background/history
- Motivations and goals
- Fears and weaknesses
- Relationships
- Character arc
- Unique quirks

Make the character three-dimensional and believable.', 'creative-writing', 'creative', true),

-- SEO Templates
('SEO Meta Tags', 'Optimize meta tags for search engines', 'You are an SEO specialist. Create optimized meta tags for:

Page: [PAGE_URL]
Primary keyword: [KEYWORD]
Secondary keywords: [KEYWORDS]

Generate:
- Meta title (50-60 characters)
- Meta description (150-160 characters)
- H1 heading
- H2 headings (3-5)
- Image alt text suggestions

Ensure all tags are optimized for click-through rate and SEO.', 'seo', 'marketing', true),

('Keyword Research Plan', 'Develop comprehensive keyword strategies', 'You are an SEO strategist. Create a keyword research plan for:

Website: [WEBSITE]
Industry: [INDUSTRY]
Target audience: [AUDIENCE]

Include:
- Primary keywords (3-5)
- Secondary keywords (10-15)
- Long-tail keywords (10-20)
- Question-based keywords
- Competitor keywords
- Search intent analysis
- Difficulty assessment

Format: Organized by priority', 'seo', 'marketing', true),

-- Customer Service Templates
('Customer Support Response', 'Handle customer inquiries professionally', 'You are a customer support specialist. Write a response to this customer inquiry:

Customer issue: [ISSUE]
Customer tone: [TONE]
Resolution available: [RESOLUTION]

Create a response that:
- Acknowledges the issue
- Shows empathy
- Provides clear solution
- Offers additional help
- Maintains brand voice

Tone: [COMPANY_TONE]', 'support', 'customer-service', true),

('FAQ Generator', 'Create comprehensive FAQ sections', 'You are a customer experience expert. Generate FAQs for:

Product/Service: [PRODUCT]
Common questions: [QUESTIONS]

Create 10-15 FAQ pairs covering:
- Product features
- Pricing and billing
- Technical requirements
- Troubleshooting
- Returns and refunds
- Contact information

Format: Question and detailed answer', 'support', 'customer-service', true);

-- Add more templates as needed

