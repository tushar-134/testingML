# ML Model - Server Deployment Guide

## 🎯 Goal
Run the ML model on a server (not cloud API) where Ollama runs alongside your Flask API.

## 🚀 Option 1: Local Server + ngrok (Quickest for Demo)

### Setup (5 minutes)

1. **Start the ML model locally:**
   ```bash
   cd /Users/nigamanandajoshi/Desktop/SIHFinals/SIHProject
   ./start.sh
   ```
   
   This will:
   - Check Ollama installation
   - Start Ollama server
   - Pull the model
   - Start Flask API on `http://localhost:5000`

2. **Expose it publicly with ngrok:**
   ```bash
   # In a new terminal
   ngrok http 5000
   ```
   
   Copy the URL: `https://abc123.ngrok-free.app`

3. **Use in your frontend:**
   ```javascript
   const ML_API_URL = 'https://abc123.ngrok-free.app';
   
   fetch(`${ML_API_URL}/match-jobs`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(resumeData)
   });
   ```

**Pros:**
- ✅ Works in 5 minutes
- ✅ Free (ngrok has free tier)
- ✅ Full control over server
- ✅ Uses your existing code

**Cons:**
- ⚠️ Computer must stay running
- ⚠️ URL changes on restart (unless paid ngrok plan)

---

## 🐳 Option 2: Railway (Docker Deployment)

Railway supports Docker, so we can deploy Ollama + your API together.

### Setup

1. **Files are ready:**
   - `Dockerfile` ✅
   - `docker-start.sh` ✅
   - `app.py` ✅

2. **Deploy to Railway:**
   - Go to https://railway.app
   - Sign up (free $5 credit)
   - Create New Project → Deploy from GitHub
   - Select `nigamanandajoshi/SIHFinals`
   - Set Root Directory: `SIHProject`
   - Railway will detect Dockerfile and build

3. **Configure:**
   - Set environment variable: `PORT=5000`
   - Railway will give you a public URL

**Cost:** ~$5-10/month after free credit

---

## ✈️ Option 3: Fly.io (Docker Deployment)

Similar to Railway, great for Docker apps.

### Setup

1. **Install Fly CLI:**
   ```bash
   brew install flyctl
   flyctl auth login
   ```

2. **Deploy:**
   ```bash
   cd SIHProject
   flyctl launch
   # Follow prompts, it will detect Dockerfile
   flyctl deploy
   ```

3. **Get URL:**
   ```bash
   flyctl status
   ```

**Cost:** Free tier available (256MB RAM × 3 instances)

---

## 🖥️ Option 4: VPS (Full Control)

Deploy to your own Virtual Private Server.

### Providers:
- **DigitalOcean** ($6/month droplet)
- **Linode** ($5/month)
- **AWS EC2** (free tier for 12 months)
- **Google Cloud** ($300 free credit)

### Setup Steps:

1. **Create Ubuntu server**

2. **SSH into server and install:**
   ```bash
   # Install Ollama
   curl -fsSL https://ollama.com/install.sh | sh
   
   # Install Python
   sudo apt update
   sudo apt install python3-pip
   
   # Clone your repo
   git clone https://github.com/nigamanandajoshi/SIHFinals.git
   cd SIHFinals/SIHProject
   
   # Install dependencies
   pip3 install -r requirements.txt
   
   # Start Ollama
   ollama serve &
   ollama pull tazarov/all-minilm-l6-v2-f32:latest
   
   # Run API with gunicorn (production server)
   gunicorn -w 2 -b 0.0.0.0:5000 app:app
   ```

3. **Configure firewall:**
   ```bash
   sudo ufw allow 5000
   ```

4. **Access:** `http://your-server-ip:5000`

---

## 📊 Comparison

| Option | Cost | Setup Time | Difficulty | Best For |
|--------|------|------------|------------|----------|
| **Local + ngrok** | Free | 5 min | Easy | Development/Demo |
| **Railway** | $5-10/mo | 15 min | Easy | Production |
| **Fly.io** | Free tier | 20 min | Medium | Long-term |
| **VPS** | $5-6/mo | 30 min | Medium | Full control |

---

## 🎖️ My Recommendation

### For Today (Demo/Development):
→ **Local + ngrok**

Run this now:
```bash
cd /Users/nigamanandajoshi/Desktop/SIHFinals/SIHProject
./start.sh
```

Then in another terminal:
```bash
ngrok http 5000
```

### For Production:
→ **Railway** (easiest) or **Fly.io** (free tier)

Both support Docker and will work with your current setup.

---

## 🔗 Integration Example

Once deployed, update your frontend environment:

```javascript
// In your React app - create .env file
REACT_APP_ML_API_URL=https://your-deployment-url.com

// Use in code
const API_URL = process.env.REACT_APP_ML_API_URL || 'http://localhost:5000';

async function matchJobs(resumeData) {
  const response = await fetch(`${API_URL}/match-jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resumeData)
  });
  
  return await response.json();
}
```

---

## ⚡ Quick Start Right Now

Want to test immediately?

```bash
# Terminal 1: Start ML model
cd /Users/nigamanandajoshi/Desktop/SIHFinals/SIHProject
./start.sh

# Terminal 2: Expose publicly
brew install ngrok  # if not installed
ngrok http 5000
```

Copy the ngrok URL and you're live! 🚀
