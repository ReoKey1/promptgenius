# 📖 Prompt-U Product Documentation

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [User Guide](#user-guide)
5. [Technical Specifications](#technical-specifications)
6. [API Reference](#api-reference)
7. [Security](#security)
8. [Performance](#performance)

---

## Overview

**Prompt-U** is a SaaS platform that helps users write better AI prompts through real-time quality scoring, optimization suggestions, and a comprehensive template library.

### Key Benefits

- **Improve AI Output Quality:** Get better results from ChatGPT, Claude, and other AI tools
- **Save Time:** Use pre-built templates and optimization suggestions
- **Maintain Consistency:** Store brand voices and reuse successful prompts
- **Track Progress:** View history and quality scores over time

### Target Users

- Content creators and copywriters
- Marketing professionals
- Business owners
- Developers and technical writers
- Anyone using AI tools regularly

---

## Features

### 1. Prompt Quality Scoring

**Real-time scoring algorithm** that analyzes prompts and provides a 1-100 quality score.

**Scoring Factors:**
- **Length** (0-15 points): Word count and detail level
- **Specificity** (0-20 points): Use of specific keywords and instructions
- **Context** (0-15 points): Background information and role definition
- **Output Format** (0-15 points): Structure and format specifications
- **Examples** (0-15 points): Inclusion of examples
- **Constraints** (0-10 points): Boundaries and limitations
- **Clarity** (0-10 points): Clear instructions and sentence structure

**Score Ratings:**
- 80-100: Excellent (green)
- 60-79: Good (blue)
- 40-59: Fair (orange)
- 0-39: Poor (red)

### 2. Optimization Suggestions

**AI-powered suggestions** to improve prompt quality:

- Add more detail
- Specify output format
- Include examples
- Define context or role
- Add constraints
- Be more specific
- Use clear action verbs

**Impact Levels:**
- High: Significant improvement to quality score
- Medium: Moderate improvement
- Low: Minor improvement

### 3. Template Library

**6 default templates** covering common use cases:

1. **Blog Post Outline** (Content)
   - Structured outline with headline, sections, and CTA
   - Target: Content creators

2. **Email Marketing Campaign** (Marketing)
   - 3-email sequence with problem-solution-action flow
   - Target: Marketers

3. **Social Media Post** (Marketing)
   - Platform-specific posts with hooks and hashtags
   - Target: Social media managers

4. **Customer Support Response** (Support)
   - Empathetic support replies with solutions
   - Target: Support teams

5. **Product Description** (Sales)
   - Benefit-focused descriptions with CTAs
   - Target: E-commerce businesses

6. **Code Documentation** (Code)
   - Technical documentation with examples
   - Target: Developers

**Custom Templates:**
- Users can create unlimited custom templates
- Templates can be private or public
- Variable placeholders: `{{variable_name}}`

### 4. Brand Voice Profiles

**Store and reuse brand voices** for consistent AI output:

**Profile Fields:**
- Name (e.g., "Professional Tech Startup")
- Tone (e.g., "Professional yet friendly")
- Description (detailed brand guidelines)
- Sample text (example of brand voice)
- Keywords (brand-specific terms)

**Use Cases:**
- Maintain consistency across team members
- Switch between multiple brands
- Ensure AI matches your brand identity

### 5. Prompt History & Versioning

**Automatic tracking** of all prompts:

- View all past prompts
- See quality scores over time
- Filter by date, score, or brand voice
- Version control for iterative improvements
- One-click reuse of successful prompts

### 6. Dashboard

**Centralized interface** for all features:

- Prompt editor with live scoring
- Template browser
- Brand voice manager
- History viewer
- Analytics overview

---

## Architecture

### Technology Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design (mobile-first)
- No framework dependencies (vanilla JS)

**Backend:**
- Supabase (PostgreSQL database)
- Supabase Auth (authentication)
- Row Level Security (RLS) policies

**Hosting:**
- Vercel (frontend hosting)
- Supabase (database hosting)
- GitHub (version control)

**Payments:**
- Stripe (payment processing)
- Stripe Checkout (hosted checkout)
- Webhooks (order fulfillment)

### Database Schema

**Tables:**
1. `profiles` - User profiles
2. `brand_voices` - Brand voice profiles
3. `templates` - Prompt templates
4. `prompts` - User prompts
5. `prompt_versions` - Prompt version history

**Relationships:**
- Users → Profiles (1:1)
- Users → Brand Voices (1:many)
- Users → Templates (1:many)
- Users → Prompts (1:many)
- Prompts → Prompt Versions (1:many)

### Security Architecture

**Authentication:**
- Email/password authentication
- JWT-based sessions
- Automatic token refresh
- Password strength requirements

**Authorization:**
- Row Level Security (RLS) on all tables
- Users can only access their own data
- Role-based access control ready

**Data Protection:**
- Encryption at rest (database)
- Encryption in transit (HTTPS/TLS)
- Input sanitization
- XSS protection
- CSRF protection
- SQL injection prevention

---

## User Guide

### Getting Started

#### 1. Sign Up

1. Click "Sign Up" on landing page
2. Enter email, password, and name
3. Verify email (if enabled)
4. Redirected to dashboard

#### 2. Write Your First Prompt

1. Type or paste prompt in editor
2. Watch quality score update in real-time
3. Review optimization suggestions
4. Click suggestions to apply improvements
5. Copy optimized prompt
6. Use in ChatGPT, Claude, or other AI tools

#### 3. Use a Template

1. Click "Templates" tab
2. Browse categories: Content, Marketing, Sales, Support, Code
3. Click template to preview
4. Click "Use Template"
5. Fill in variable placeholders (e.g., `{{topic}}`)
6. Edit and optimize as needed

#### 4. Create a Brand Voice

1. Click "Brand Voices" tab
2. Click "+ New Brand Voice"
3. Fill in:
   - Name (e.g., "Tech Startup")
   - Tone (e.g., "Professional yet friendly")
   - Description (brand guidelines)
   - Sample text (example)
   - Keywords (brand terms)
4. Click "Save"
5. Select brand voice when writing prompts

#### 5. View History

1. Click "History" tab
2. See all past prompts with scores
3. Filter by date, score, or brand voice
4. Click prompt to reuse or edit
5. Track quality score improvements over time

### Advanced Features

#### Custom Templates

**Create:**
1. Write a prompt with variables: `{{variable_name}}`
2. Click "Save as Template"
3. Fill in name, category, description
4. Click "Save"

**Use:**
1. Select template from library
2. Variables highlighted in editor
3. Replace with actual values
4. Edit and optimize

#### Prompt Versioning

**Save Version:**
1. Edit an existing prompt
2. Click "Save Version"
3. New version created with score

**Compare Versions:**
1. Open prompt from history
2. Click "View Versions"
3. See all versions with scores
4. Click version to restore

#### Collaboration (Coming Soon)

- Share templates with team
- Shared brand voice profiles
- Team prompt library
- Usage analytics

---

## Technical Specifications

### Prompt Scoring Algorithm

```javascript
// Scoring factors and weights
Length: 0-15 points (target: 30-50 words)
Specificity: 0-20 points (keywords count)
Context: 0-15 points (role/background provided)
Output Format: 0-15 points (format specified)
Examples: 0-15 points (examples included)
Constraints: 0-10 points (boundaries set)
Clarity: 0-10 points (clear action verbs)

Total: 0-100 points
```

### API Endpoints

**Authentication:**
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out
- `POST /api/auth/reset-password` - Request password reset

**Prompts:**
- `GET /api/prompts` - List user prompts
- `POST /api/prompts` - Create prompt
- `GET /api/prompts/:id` - Get prompt
- `PUT /api/prompts/:id` - Update prompt
- `DELETE /api/prompts/:id` - Delete prompt

**Templates:**
- `GET /api/templates` - List templates
- `POST /api/templates` - Create template
- `GET /api/templates/:id` - Get template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

**Brand Voices:**
- `GET /api/brand-voices` - List brand voices
- `POST /api/brand-voices` - Create brand voice
- `GET /api/brand-voices/:id` - Get brand voice
- `PUT /api/brand-voices/:id` - Update brand voice
- `DELETE /api/brand-voices/:id` - Delete brand voice

**Payments:**
- `POST /api/create-checkout` - Create Stripe checkout
- `POST /api/stripe-webhook` - Handle Stripe events

### Database Queries

**All queries use Supabase client:**

```javascript
// Example: Get user prompts
const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
```

**Row Level Security ensures:**
- Users can only query their own data
- No manual user_id filtering needed in most cases
- Automatic security at database level

### Performance Metrics

**Target Metrics:**
- Page load: < 2 seconds
- API response: < 500ms
- Quality score calculation: < 100ms
- Database queries: < 200ms

**Optimization Techniques:**
- Database indexing on frequently queried fields
- Client-side caching of templates and brand voices
- Lazy loading of history
- Debounced quality score calculation

---

## API Reference

### Authentication

#### Sign Up

```javascript
POST /api/auth/signup

Request:
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "fullName": "John Doe"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "session": { ... }
  }
}
```

#### Login

```javascript
POST /api/auth/login

Request:
{
  "email": "user@example.com",
  "password": "SecurePass123"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "session": { ... }
  }
}
```

### Prompts

#### Create Prompt

```javascript
POST /api/prompts

Request:
{
  "content": "Write a blog post about...",
  "quality_score": 85,
  "brand_voice_id": "uuid",
  "template_id": "uuid"
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "...",
    "quality_score": 85,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### Templates

#### List Templates

```javascript
GET /api/templates

Response:
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Blog Post Outline",
      "category": "content",
      "description": "...",
      "content": "...",
      "uses": 156
    },
    ...
  ]
}
```

---

## Security

### Authentication Security

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

**Rate Limiting:**
- Maximum 5 failed login attempts
- 15-minute lockout after 5 failures
- Automatic reset after lockout period

**Session Management:**
- JWT tokens with 60-minute expiration
- Automatic token refresh every 50 minutes
- Secure httpOnly cookies
- CSRF protection

### Data Security

**Database:**
- Row Level Security (RLS) on all tables
- Users can only access their own data
- Encrypted at rest
- Encrypted in transit (TLS)

**Input Validation:**
- All user input sanitized
- XSS protection
- SQL injection prevention
- Length limits on all fields

**API Security:**
- CORS whitelist
- Environment variables for secrets
- Webhook signature verification (Stripe)
- Rate limiting on all endpoints

### Compliance

**GDPR:**
- User data deletion on request
- Data export functionality
- Clear privacy policy
- Cookie consent

**PCI DSS:**
- Stripe handles all payment data
- No credit card data stored
- PCI compliant checkout

---

## Performance

### Load Times

**Landing Page:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Total Load Time: < 2s

**Dashboard:**
- First Contentful Paint: < 2s
- Time to Interactive: < 4s
- Total Load Time: < 3s

### Optimization Techniques

**Frontend:**
- Minified CSS and JavaScript
- Lazy loading of images
- Debounced input handlers
- Client-side caching

**Backend:**
- Database indexing
- Connection pooling
- Query optimization
- CDN for static assets

### Scalability

**Current Capacity (Free Tier):**
- 50,000 monthly active users (Supabase)
- 100GB bandwidth (Vercel)
- 500MB database (Supabase)

**Scaling Strategy:**
- Upgrade to Supabase Pro ($25/month) for 8GB database
- Upgrade to Vercel Pro ($20/month) for more bandwidth
- Add caching layer (Redis) for high traffic
- Implement database read replicas

---

## Support

### Documentation
- User Guide: https://prompt-u.com/docs
- API Reference: https://prompt-u.com/api-docs
- Video Tutorials: https://youtube.com/@prompt-u

### Contact
- Email: support@prompt-u.com
- Twitter: @promptu
- Discord: https://discord.gg/prompt-u

### Status
- System Status: https://status.prompt-u.com
- Uptime: 99.9% target

---

**Version:** 1.0.0  
**Last Updated:** 2024-01-XX  
**License:** Proprietary

