# 🚀 Deploy Backend to Render - CLI Method

## Option 1: Deploy via render.yaml (Easiest - Recommended)

Since you already have `render.yaml` in your repo and pushed to GitHub:

### Step 1: Login to Render and Create Blueprint

1. Open https://dashboard.render.com in your browser
2. Click **"New +" → "Blueprint"**
3. Connect your GitHub repository: `nigamanandajoshi/SIHFinals`
4. Render will detect `sih_backend/render.yaml`
5. Click **"Apply"**

### Step 2: Set Environment Variables

Render will prompt you to set these (marked as `sync: false` in render.yaml):

```
MONGO_URI = mongodb+srv://sih_user:K6dJmnBUcBs8_Y_@cluster0.yb1popv.mongodb.net/sih_database?retryWrites=true&w=majority

JWT_SECRET = <generate random 32+ character string>

ML_API_URL = <leave empty for now>

FRONTEND_URL = <leave empty for now>

FAST2SMS_API_KEY = bvpqR24N9yU0HlfdODESAMBx6C5izYFKnsuGtoW7jgIJQc8kw3
```

### Step 3: Deploy!

Click **"Apply"** and Render will automatically deploy!

---

## Option 2: Using Render CLI

### Install Render CLI

```powershell
# Using npm
npm install -g @render/cli

# Or using pip
pip install render-cli
```

### Login to Render

```powershell
render login
```

This will open a browser for authentication.

### Deploy

```powershell
cd c:\Users\ritik\SihWithModel\SIHFinals\sih_backend

# Deploy using render.yaml
render blueprint apply
```

---

## Option 3: Manual CLI Deploy (Without render.yaml)

```powershell
# Create a new web service
render create web --name sih-backend `
  --env node `
  --build-command "npm install" `
  --start-command "npm start" `
  --repo https://github.com/nigamanandajoshi/SIHFinals `
  --root-directory sih_backend
```

---

## Quick Status Check

After deployment, check status:

```powershell
# List all services
render services list

# Get service details
render service get sih-backend

# View logs
render service logs sih-backend
```

---

## Generate JWT_SECRET

```powershell
# PowerShell command to generate random string
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

---

## What Happens Next

1. ✅ Code is already on GitHub
2. ✅ render.yaml is configured
3. ⬜ You create Blueprint on Render dashboard
4. ⬜ Set environment variables
5. ⬜ Render auto-deploys
6. ⬜ Get backend URL (e.g., `https://sih-backend.onrender.com`)

---

**Recommended Approach**: Use **Option 1 (Blueprint)** - it's the easiest and uses your existing render.yaml!

Just open https://dashboard.render.com, click New → Blueprint, select your GitHub repo, and you're done! 🎉
