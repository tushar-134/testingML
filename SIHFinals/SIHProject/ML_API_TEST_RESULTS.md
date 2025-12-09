# ML API - Standalone Test Results

## ✅ ML API Status: **RUNNING**

**Port**: 5001  
**Model**: `tazarov/all-minilm-l6-v2-f32:latest`  
**Jobs Loaded**: 761  
**Status**: Healthy

---

## 📊 Test Results

### Test 1: Health Check ✅
```json
{
  "jobs_loaded": 761,
  "model": "tazarov/all-minilm-l6-v2-f32:latest",
  "status": "healthy"
}
```

### Test 2: Job Matching ✅
- Endpoint: `POST /match-jobs`
- Successfully matched jobs based on resume data
- Returns top 20 job matches with scores

### Test 3: Job Search ✅  
- Endpoint: `GET /search-jobs?q=python developer`
- Successfully searched jobs by keyword
- Returns relevant results

---

## 🎯 ML API Endpoints

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| `/health` | GET | Check API health | ✅ |
| `/match-jobs` | POST | Get ML-matched jobs | ✅ |
| `/search-jobs?q=query` | GET | Search jobs by keyword | ✅ |

---

## 🧪 Run Your Own Tests

### Quick Health Check:
```bash
curl http://localhost:5001/health
```

### Test Job Matching:
```bash
curl -X POST http://localhost:5001/match-jobs \
  -H "Content-Type: application/json" \
  -d '{
    "position": "Software Engineer",
    "skills": "Python, JavaScript, React",
    "qualification": "B.Tech CS"
  }'
```

### Search Jobs:
```bash
curl "http://localhost:5001/search-jobs?q=python%20developer"
```

### Run Full Test Script:
```bash
cd SIHProject
python test_ml_standalone.py
```

---

## 📝 Sample Request/Response

**Request**:
```json
{
  "position": "Software Engineer",
  "skills": "Python, JavaScript, React, Node.js, ML",
  "summary": "Full-stack developer with 2 years experience",
  "qualification": "B.Tech Computer Science",
  "experience": "2 years",
  "work_experience": "Built web apps and ML models"
}
```

**Response**:
```json
{
  "matches": [
    {
      "title": "Software Engineer",
      "company": "Tech Corp",
      "match_score": 0.89,
      "location": "Bangalore",
      "skills_match": 0.92,
      "experience_match": 0.85,
      ...
    },
    ...
  ],
  "total_jobs_searched": 761
}
```

---

## ✅ ML API is Working Perfectly!

All endpoints tested and operational. Ready to integrate with backend! 🚀
