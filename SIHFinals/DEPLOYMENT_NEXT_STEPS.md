# Next Steps - Complete Render Deployment

Since the Render dashboard requires manual interaction, here are your options:

## Option 1: Continue in Browser (Recommended - Easier)

The Render dashboard should be open in your browser. Complete these steps:

### Step 1: Select Your Repository
- You should see a page asking to connect a repository
- Find and click: **`tushar-134/testingML`**
- Click **"Connect"**

### Step 2: Configure the Service
Fill in these exact values:

```
Name: sih-backend
Region: Singapore  
Branch: main
Root Directory: SIHFinals/sih_backend   ← CRITICAL!
Environment: Node
Build Command: npm install
Start Command: npm start
```

### Step 3: Add Environment Variables
Click **"Advanced"** button, then add these:

```
MONGO_URI = mongodb+srv://sih_user:K6dJmnBUcBs8_Y_@cluster0.yb1popv.mongodb.net/sih_database?retryWrites=true&w=majority
NODE_ENV = production
PORT = 10000
JWT_SECRET = cBjCrnK43UDZPxHS1kflNaopJETz6L8M
CLOUD_NAME = dsf0yp2hr
CLOUD_API_KEY = 563713949862699
CLOUD_API_SECRET = d_HSX5dQCyDnZaCWltF0SNyDVwk
```

### Step 4: Create
- Scroll to bottom
- Click **"Create Web Service"**
- Wait 5-10 minutes

### Step 5: Verify
Once deployed:
- Check "Logs" tab for "MongoDB Connected"
- Copy your backend URL (e.g., `https://sih-backend.onrender.com`)
- Test it in browser - should show "Youth Registration Backend Running 🚀"

---

## Option 2: Using Render CLI (If Option 1 Doesn't Work)

I'm installing the Render CLI now. Once installed, I'll authenticate and deploy for you.

---

**Which option do you prefer? Or is the browser deployment already in progress?**
