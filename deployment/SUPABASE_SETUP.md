# Supabase Setup Instructions

Follow these steps to set up your Supabase database for PromptGenius.

## Step 1: Create Supabase Project

1. **Open Supabase in a new tab**: https://supabase.com/dashboard
2. **Sign in with GitHub**:
   - Click "Continue with GitHub"
   - Authorize Supabase if prompted
3. **Create a new project**:
   - Click "New Project"
   - **Organization**: Select or create one
   - **Project Name**: `prompt-u`
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to your users (e.g., US East, EU West)
   - Click "Create new project"
4. **Wait 2-3 minutes** for the project to initialize

## Step 2: Get Your Credentials

Once your project is ready:

1. Go to **Settings** (gear icon in sidebar) > **API**
2. Copy these values (you'll need them later):

```
Project URL: https://xxxxx.supabase.co
anon public key: eyJhbGc... (long string)
service_role key: eyJhbGc... (different long string - keep this SECRET!)
```

## Step 3: Run Database Schema

1. In Supabase, go to **SQL Editor** (in sidebar)
2. Click "New Query"
3. I'll provide you with the SQL to paste in the next message
4. After pasting, click "Run" or press Ctrl+Enter
5. You should see "Success. No rows returned"

## Step 4: Seed Template Data

1. Create another new query in SQL Editor
2. I'll provide the seed SQL in the next message
3. Run it
4. You should see "Success" with rows inserted

## Step 5: Verify Setup

1. Go to **Table Editor** (in sidebar)
2. You should see these tables:
   - users
   - prompts
   - templates
   - brand_voices
   - teams
   - team_members
3. Click on "templates" - you should see 15+ rows

---

**Ready to proceed?** Let me know when you've completed Step 1 and 2, and I'll provide the SQL scripts.

