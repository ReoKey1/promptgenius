# Prompt-U Landing Page Deployment Instructions

## Overview

This guide will help you deploy the marketing landing page as the main homepage at **prompt-u.com** while keeping the React app accessible at **/dashboard**.

---

## Current Setup

**Current State:**
- `prompt-u.com` → React app (dashboard)
- No marketing landing page

**Target State:**
- `prompt-u.com` → Marketing landing page with modals for login/signup
- `prompt-u.com/dashboard` → React app (after login)
- Login/Signup → Modal popups that authenticate and redirect to dashboard

---

## Architecture

### File Structure

```
/home/ubuntu/prompt-u/
├── landing-page/          # Marketing landing page (NEW - to be deployed)
│   ├── index.html         # Main landing page with modals
│   ├── styles.css         # Styling including modal styles
│   ├── store.html         # Merchandise store
│   ├── blog/              # Blog posts
│   └── assets/            # Images and assets
│
├── frontend/              # React app (EXISTING)
│   ├── src/
│   ├── public/
│   └── index.html         # React app entry point
│
└── backend/               # API server (EXISTING)
    └── routes/
        └── auth.js        # Login/signup endpoints
```

---

## Deployment Options

### Option 1: Static File Hosting + React App (Recommended)

**Setup:**
1. Deploy landing page as static files at root
2. Configure routing to serve React app at `/dashboard`
3. API endpoints at `/api/*`

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name prompt-u.com www.prompt-u.com;
    
    # Root directory for landing page
    root /var/www/prompt-u/landing-page;
    index index.html;
    
    # Serve landing page static files
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Serve blog
    location /blog {
        try_files $uri $uri/ /blog/blog-post.html;
    }
    
    # Serve store
    location /store {
        try_files $uri $uri/ /store.html;
    }
    
    # Serve React app at /dashboard
    location /dashboard {
        alias /var/www/prompt-u/frontend/dist;
        try_files $uri $uri/ /dashboard/index.html;
    }
    
    # API proxy to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Static assets
    location /assets {
        alias /var/www/prompt-u/landing-page/assets;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

---

### Option 2: Vercel Deployment (Easiest)

**Setup:**
1. Deploy landing page to Vercel
2. Configure rewrites for React app and API

**vercel.json:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "landing-page/**",
      "use": "@vercel/static"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/dashboard/(.*)",
      "dest": "/frontend/$1"
    },
    {
      "src": "/api/(.*)",
      "dest": "/backend/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/landing-page/$1"
    }
  ]
}
```

---

### Option 3: Express.js Server (Full Control)

**Setup:**
1. Create Express server to serve both landing page and React app
2. Handle routing and authentication

**server.js:**

```javascript
const express = require('express');
const path = require('path');
const app = express();

// Serve static landing page files
app.use(express.static(path.join(__dirname, 'landing-page')));

// Serve React app at /dashboard
app.use('/dashboard', express.static(path.join(__dirname, 'frontend/dist')));

// API routes
app.use('/api', require('./backend/routes'));

// Landing page routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing-page/index.html'));
});

app.get('/store', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing-page/store.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing-page/blog/blog-post.html'));
});

// Dashboard route (React app)
app.get('/dashboard/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

## Authentication Flow

### Login Process

1. User clicks **Login** button on landing page
2. Modal popup appears with login form
3. User enters email and password
4. JavaScript sends POST request to `/api/auth/login`
5. Backend validates credentials
6. If valid: Returns JWT token
7. Frontend stores token in localStorage
8. Redirects to `/dashboard`

### Signup Process

1. User clicks **Sign Up** button on landing page
2. Modal popup appears with signup form
3. User enters name, email, password
4. JavaScript sends POST request to `/api/auth/signup`
5. Backend creates user account
6. Returns JWT token
7. Frontend stores token in localStorage
8. Redirects to `/dashboard`

---

## Backend API Endpoints Required

### POST /api/auth/login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### POST /api/auth/signup

**Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

## Step-by-Step Deployment

### Step 1: Prepare Files

```bash
# Copy landing page files to deployment directory
cd /home/ubuntu/prompt-u
cp -r landing-page /var/www/prompt-u/

# Build React app
cd frontend
npm run build

# Copy React build to deployment directory
cp -r dist /var/www/prompt-u/frontend/
```

---

### Step 2: Configure Backend Routes

Ensure your backend has these authentication endpoints:

**backend/routes/auth.js:**

```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }
    
    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists' 
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;
```

---

### Step 3: Update React App Routing

**frontend/src/App.jsx:**

```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates';
import BrandVoices from './pages/BrandVoices';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  
  return (
    <BrowserRouter basename="/dashboard">
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
        />
        <Route path="/templates" element={<Templates />} />
        <Route path="/brand-voices" element={<BrandVoices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

### Step 4: Configure Web Server

Choose one of the deployment options above and configure your web server accordingly.

**For Nginx:**
```bash
sudo nano /etc/nginx/sites-available/prompt-u.com
# Paste the Nginx configuration from Option 1
sudo nginx -t
sudo systemctl reload nginx
```

**For Vercel:**
```bash
cd /home/ubuntu/prompt-u
vercel deploy --prod
```

---

### Step 5: Test the Flow

1. Visit `prompt-u.com` → Should show landing page
2. Click **Sign Up** → Modal should appear
3. Fill form and submit → Should redirect to `/dashboard`
4. Click **Login** → Modal should appear
5. Enter credentials → Should redirect to `/dashboard`
6. Visit `prompt-u.com/store` → Should show store page
7. Visit `prompt-u.com/blog` → Should show blog post

---

## Environment Variables

Ensure these are set in your backend:

```bash
# .env
JWT_SECRET=your-secret-key-here
DATABASE_URL=mongodb://localhost:27017/promptu
PORT=5000
NODE_ENV=production
```

---

## Security Considerations

1. **HTTPS Required** - Use SSL certificate (Let's Encrypt)
2. **CORS Configuration** - Allow only your domain
3. **Rate Limiting** - Prevent brute force attacks on login
4. **Password Requirements** - Minimum 8 characters
5. **JWT Expiration** - Set reasonable expiration (7 days)
6. **Input Validation** - Sanitize all user inputs
7. **SQL Injection Prevention** - Use parameterized queries

---

## Troubleshooting

### Issue: Modal doesn't appear

**Solution:** Check browser console for JavaScript errors. Ensure modal functions are defined.

### Issue: Login/Signup fails

**Solution:** Check network tab in browser dev tools. Verify API endpoint is correct and backend is running.

### Issue: Redirect to /dashboard fails

**Solution:** Ensure React app is properly built and served at `/dashboard` path.

### Issue: 404 on assets

**Solution:** Check file paths in HTML. Ensure assets directory is accessible.

---

## Quick Deploy Commands

```bash
# 1. Navigate to project
cd /home/ubuntu/prompt-u

# 2. Build React app
cd frontend && npm run build && cd ..

# 3. Copy files to web server
sudo cp -r landing-page/* /var/www/prompt-u/
sudo cp -r frontend/dist /var/www/prompt-u/dashboard

# 4. Set permissions
sudo chown -R www-data:www-data /var/www/prompt-u
sudo chmod -R 755 /var/www/prompt-u

# 5. Restart web server
sudo systemctl restart nginx

# 6. Test
curl https://prompt-u.com
```

---

## Next Steps

1. ✅ Deploy landing page to prompt-u.com
2. ✅ Configure authentication endpoints
3. ✅ Test login/signup flow
4. ✅ Set up SSL certificate
5. ✅ Configure domain DNS
6. ✅ Test on mobile devices
7. ✅ Set up Google Analytics
8. ✅ Monitor error logs

---

**Your landing page is now ready to deploy!** Follow the steps above based on your hosting setup.

For questions or issues, refer to the troubleshooting section or check the backend logs.

