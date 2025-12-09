# 🧪 Quick ML API Testing Guide

## Method 1: Browser Test (Easiest!)

**I just opened this for you:**
- **Health Check**: http://localhost:5001/health

You should see:
```json
{
  "jobs_loaded": 761,
  "model": "tazarov/all-minilm-l6-v2-f32:latest",
  "status": "healthy"
}
```

If you see this, **ML API is working!** ✅

---

## Method 2: Interactive Demo (Visual!)

**I just opened:** `interactive_demo.html`

This is a web interface where you can:
1. Enter your resume details
2. Click "Find Matching Jobs"
3. See real ML-powered job matches!

---

## Method 3: Command Line Test

Open PowerShell and run:

```powershell
# Quick health check
curl http://localhost:5001/health

# Test job matching
curl -X POST http://localhost:5001/match-jobs `
  -H "Content-Type: application/json" `
  -d '{
    "position": "Software Developer",
    "skills": "Python, JavaScript",
    "qualification": "B.Tech"
  }'
```

---

## Method 4: Python Test Script

```powershell
cd SIHProject
python test_ml_standalone.py
```

This will show:
- ✅ Health check
- ✅ Job matching results
- ✅ Search functionality

---

## What You Should See

### ✅ If Working:
- Health endpoint returns status "healthy"
- 761 jobs loaded
- Match-jobs returns job recommendations
- No errors in terminal

### ❌ If Not Working:
- Connection refused error
- Port 5001 not responding
- Error messages in Python terminal

---

## Quick Verification Checklist

- [ ] Open http://localhost:5001/health in browser
- [ ] See "healthy" status
- [ ] See 761 jobs_loaded
- [ ] Try interactive_demo.html
- [ ] Get job match results

**If all checked, ML API is working perfectly!** 🎉
