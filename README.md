# Prompt-U

**The AI prompt optimization platform that makes your prompts better.**

Prompt-U is a complete SaaS application that analyzes, scores, and optimizes AI prompts to help users get consistent, high-quality results from AI tools like ChatGPT, Claude, and others.

## 🎯 What Is This?

This is a **complete, production-ready SaaS application** built for launching on AppSumo and other lifetime deal platforms. It includes:

- ✅ Full backend API (Node.js + Express)
- ✅ Complete frontend application (React + Vite)
- ✅ Marketing website (React + Tailwind)
- ✅ Database schema (PostgreSQL/Supabase)
- ✅ Payment integration (Stripe)
- ✅ Authentication & authorization
- ✅ Tier-based feature limiting
- ✅ Quality scoring algorithm
- ✅ Deployment configurations
- ✅ Comprehensive documentation
- ✅ AppSumo launch materials

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account (free)
- Stripe account (free)

### Setup (5 minutes)

1. **Clone and install:**
   ```bash
   git clone <your-repo>
   cd promptgenius
   ```

2. **Set up database:**
   - Create Supabase project
   - Run `database/schema.sql` in SQL Editor
   - Run `database/seed_templates.sql`

3. **Configure backend:**
   ```bash
   cd backend
   cp .env.example .env
   # Fill in your Supabase and Stripe credentials
   npm install
   npm run dev
   ```

4. **Configure frontend:**
   ```bash
   cd ../frontend
   cp .env.example .env
   # Fill in API URL and Supabase credentials
   npm install
   npm run dev
   ```

5. **Open app:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

**Full setup guide:** [docs/SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)

## 📚 Documentation

- **[Setup Guide](./docs/SETUP_GUIDE.md)** - Complete setup instructions
- **[Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)** - Deploy to production
- **[API Documentation](./docs/API_DOCUMENTATION.md)** - API reference
- **[Features](./docs/FEATURES.md)** - All features explained

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Node.js + Express
- Supabase (PostgreSQL)
- JWT authentication
- Stripe payments
- bcryptjs (password hashing)

**Frontend:**
- React 18
- Vite (build tool)
- Tailwind CSS
- shadcn/ui components
- Zustand (state management)
- React Router
- Axios (API client)

**Database:**
- PostgreSQL (via Supabase)
- Row Level Security (RLS)
- Automatic backups

**Deployment:**
- Backend: Railway ($5/month)
- Frontend: Vercel (free)
- Database: Supabase (free)
- **Total cost:** ~$5/month

### Project Structure

```
promptgenius/
├── backend/              # API server
│   ├── config/          # Supabase, Stripe config
│   ├── middleware/      # Auth, tier checking
│   ├── routes/          # API endpoints
│   ├── utils/           # Quality scoring, helpers
│   └── server.js        # Entry point
│
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── lib/        # API client, store
│   │   └── App.jsx     # Main component
│   └── package.json
│
├── marketing-website/   # Landing page
│   ├── src/
│   └── package.json
│
├── database/           # SQL schemas
│   ├── schema.sql
│   └── seed_templates.sql
│
├── docs/              # Documentation
└── launch-materials/  # AppSumo listing
```

## ✨ Key Features

### Core Features

**Quality Scoring (0-100)**
- Analyzes prompts based on 5 dimensions
- Length, specificity, structure, context, constraints
- Instant feedback

**Improvement Suggestions**
- Specific, actionable recommendations
- Tailored to each prompt
- Learn prompt engineering

**Prompt Library**
- Organize by category, industry
- Search and filter
- Version history

**Brand Voice Profiles**
- Define tone, style, guidelines
- Apply to any prompt
- Ensure consistency

**Professional Templates**
- 15+ pre-built templates
- Marketing, content, business, technical
- Fully customizable

**Team Collaboration**
- Share prompts with team
- Role-based permissions
- Centralized library

### Technical Features

**Authentication**
- JWT-based auth
- Secure password hashing
- Token refresh

**Authorization**
- Row Level Security (RLS)
- Tier-based feature limits
- Role-based access control

**Payment Processing**
- Stripe integration
- Lifetime deals (one-time payment)
- Monthly subscriptions
- Webhook handling

**Tier System**
- Tier 1: 100 prompts, 1 user
- Tier 2: 500 prompts, 3 users
- Tier 3: Unlimited, 10 users
- Automatic enforcement

## 💰 Business Model

### Lifetime Deal Tiers

**Tier 1 - Starter: $59**
- 100 saved prompts
- 5 custom templates
- 1 brand voice
- Solo use

**Tier 2 - Professional: $79**
- 500 saved prompts
- 20 custom templates
- 3 brand voices
- 3 team members

**Tier 3 - Enterprise: $99**
- Unlimited prompts
- Unlimited templates
- Unlimited brand voices
- 10 team members
- Analytics

### Revenue Projections

**Conservative (1,500 sales on AppSumo):**
- Gross: $118,500
- Net (30%): $35,550
- Plus monthly subs: $50K+ year 1
- **Total Year 1**: ~$85K

**Moderate (2,500 sales):**
- Gross: $197,500
- Net: $59,250
- Plus monthly subs: $79K
- **Total Year 1**: ~$138K

**Strong (5,000 sales):**
- Gross: $395,000
- Net: $118,500
- Plus monthly subs: $120K
- **Total Year 1**: ~$238K

## 🎯 Target Market

### Primary Audience

1. **Content Creators** (32%)
   - Bloggers, YouTubers, podcasters
   - Need consistent AI output

2. **Marketers** (26%)
   - Social media managers
   - Email marketers
   - SEO specialists

3. **Small Businesses** (23%)
   - Entrepreneurs
   - Solopreneurs
   - Freelancers

4. **Agencies** (19%)
   - Marketing agencies
   - Content agencies
   - Need team collaboration

### Market Size

- **AI tool users**: 100M+ globally
- **Regular AI users**: 20M+
- **Willing to pay for optimization**: 2M+
- **Target**: 10,000 users year 1

## 🚀 Launch Strategy

### Phase 1: AppSumo Launch (Month 1-3)

**Goal:** 1,500-2,500 sales

**Tactics:**
- Compelling listing copy
- Professional demo video
- Early reviews (beta users)
- Active Q&A engagement
- Email marketing

### Phase 2: Additional Platforms (Month 4-6)

**Platforms:**
- PitchGround
- Prime Club
- DealFuel

**Goal:** 600-1,000 additional sales

### Phase 3: Direct Sales (Month 6+)

**Focus:**
- SEO content marketing
- Affiliate program
- Monthly subscriptions
- **Goal:** $10K-$20K MRR

## 📊 Competitive Advantage

### vs. OnlyPrompts
- ❌ OnlyPrompts: 150K prompts (quantity)
- ✅ Prompt-U: Quality optimization
- ✅ No monthly AI credit limits
- ✅ Version control

### vs. PromptEngine
- ❌ PromptEngine: Basic generation
- ✅ Prompt-U: Quality scoring
- ✅ Improvement suggestions
- ✅ No generation limits

### vs. PromptBox
- ❌ PromptBox: Simple storage
- ✅ Prompt-U: Optimization
- ✅ Brand voice profiles
- ✅ Team collaboration

**Unique Value:** Only platform focused on making prompts better, not just storing them.

## 🛠️ Development

### Running Locally

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

**Marketing Site:**
```bash
cd marketing-website
npm run dev -- --port 3000
```

### Building for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Testing

**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
npm test
```

## 📈 Roadmap

### V1.0 (Launch) ✅
- Quality scoring
- Prompt library
- Templates
- Brand voices
- Team collaboration
- Stripe integration

### V1.1 (Month 2)
- Chrome extension
- Prompt sharing
- Advanced analytics
- Export improvements

### V1.2 (Month 4)
- AI-powered suggestions
- Integrations (Notion, Slack)
- API access
- Prompt marketplace

### V2.0 (Month 6)
- Multi-language support
- Mobile app
- Advanced team features
- Enterprise features

## 🤝 Contributing

This is a commercial product, but contributions are welcome!

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

- **Documentation:** [docs/](./docs/)
- **Issues:** GitHub Issues
- **Email:** support@promptgenius.com

## 🎉 Credits

Built with:
- React
- Node.js
- Supabase
- Stripe
- Tailwind CSS
- shadcn/ui

## 📞 Contact

- **Website:** https://promptgenius.com
- **Email:** hello@promptgenius.com
- **Twitter:** @promptgenius

---

**Ready to launch?** Follow the [Setup Guide](./docs/SETUP_GUIDE.md) to get started!

