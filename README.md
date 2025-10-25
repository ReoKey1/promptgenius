# Prompt-U

**The Only AI Tool That Scores Your Prompt Quality BEFORE You Generate**

Professional AI prompt optimization tool for content creators, marketers, and teams who want consistent, high-quality AI outputs every time.

---

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/prompt-u.git
cd prompt-u

# Open in browser
open index.html
# or
python3 -m http.server 8000
```

### Deploy to Production
See [deployment/QUICK_START.md](deployment/QUICK_START.md) for complete 40-minute deployment guide.

---

## 📁 Project Structure

```
prompt-u/
├── index.html              # Landing page
├── dashboard.html          # User dashboard  
├── store.html              # Merchandise store
├── styles.css              # Main stylesheet
├── favicon.ico             # Browser icon
├── assets/                 # Images and logos
├── src/                    # JavaScript modules
├── blog/                   # Blog posts
├── deployment/             # Deployment guides
└── docs/                   # Documentation
```

---

## 🎯 Features

- **Optimized Landing Page** - High-conversion design for AppSumo
- **Dynamic Branding** - Blue-purple gradient logo (4 variations)
- **Favicon Support** - All browsers and devices
- **Supabase Auth** - Integrated login/signup modals
- **Responsive Design** - Mobile-first approach

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Supabase (PostgreSQL, Auth)
- **Deployment:** Vercel or Netlify
- **Version Control:** Git + GitHub

---

## 📚 Documentation

### Quick References
- [Quick Start Guide](deployment/QUICK_START.md) - Deploy in 40 minutes
- [Deployment Checklist](DEPLOYMENT_CHECKLIST.md) - Step-by-step tasks

### Detailed Guides
- [Deployment Guide](deployment/DEPLOYMENT_GUIDE.md) - Complete instructions
- [Supabase Setup](deployment/SUPABASE_SETUP.md) - Database configuration

### Brand & Design
- [Brand Guidelines](docs/BRAND_GUIDELINES.md) - Logo, colors, typography
- [Logo Implementation](docs/LOGO_IMPLEMENTATION.md) - Technical details
- [Favicon Implementation](docs/FAVICON_IMPLEMENTATION.md) - Browser icons

---

## 🚀 Deploy in 3 Steps

1. **Set up Supabase** → Create project, run SQL
2. **Push to GitHub** → `git push origin main`
3. **Deploy to Vercel** → Import repo, add domain

**Total Time:** ~40 minutes

---

## 🎨 Brand Colors

```css
/* Primary Gradient */
background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
```

- **Blue:** `#2563eb` - Trust, professionalism
- **Purple:** `#7c3aed` - Innovation, creativity

---

## 📝 Environment Variables

Create `.env` file:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

---

## 🔗 Links

- **Website:** https://prompt-u.com
- **Dashboard:** https://prompt-u.com/dashboard
- **Store:** https://prompt-u.com/store

---

**Prompt-U** - Master Your AI  
**Version:** 1.0.0 | **Last Updated:** October 2024

