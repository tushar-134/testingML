# SIH Project - Integrated ML Job Matching System

## 🎯 Project Structure

This project consists of 3 main components that work together:

1. **ML API** (`SIHProject/`) - Flask server with Ollama AI model - Port **5001**
2. **Backend** (`sih_backend/`) - Express.js + MongoDB - Port **5000**  
3. **Frontend** (`sih_frontend/`) - React application - Port **3000**

## 🔧 Prerequisites

- Python 3.11+ (for ML API)
- Node.js 16+ (for Backend & Frontend)
- MongoDB (local or Atlas)
- Ollama installed with `tazarov/all-minilm-l6-v2-f32:latest` model

## 🚀 Quick Start (All Components)

### Step 1: Start ML API (Port 5001)

```bash
cd SIHProject
python app.py
```

**Expected Output**: `Server running on port 5001`

### Step 2: Start Backend (Port 5000)

```bash
cd sih_backend
npm install  # First time only
npm start
```

**Expected Output**: `Server running on port 5000`

### Step 3: Start Frontend (Port 3000)

```bash
cd sih_frontend
npm install  # First time only
npm start
```

**Expected Output**: Opens browser at `http://localhost:3000`

## 📁 Component Details

### ML API (SIHProject/)

**Purpose**: Provides AI-powered job matching based on resume data

**Endpoints**:
- `GET /health` - Health check
- `POST /match-jobs` - Match jobs for a resume
- `GET /search-jobs?q=query` - Search jobs by keyword

**Changes Made**:
- ✅ Default port changed from 5000 to 5001 (to avoid conflict)
- See `app.py` line 197 for modification

### Backend (sih_backend/)

**Purpose**: Main application server, handles auth, user data, and ML integration

**Key Routes**:
- `/api/auth/*` - Authentication endpoints
- `/api/youth/*` - Youth profile management
- `/api/ai/recommend` - **NEW** Get job recommendations (calls ML API)

**Changes Made**:
- ✅ `controllers/aiController.js` - Integrated with ML API on port 5001
- ✅ Transforms Youth model data to ML API format
- All changes marked with `// MODIFIED:` and `// ADDED:` comments

**Environment Variables** (`.env`):
```env
PORT=5000
MONGO_URI=your_mongodb_connection
ML_API_URL=http://localhost:5001  # ADDED for ML integration
```

### Frontend (sih_frontend/)

**Purpose**: User interface for registration, profile, and job recommendations

**Key Pages**:
- Login/Registration
- Youth Profile Form  
- **Recommendations Page** - Now shows real ML-powered job matches!

**Changes Made**:
- ✅ `src/recommendation-results.jsx` - Fetches from backend API
- ✅ Added loading states
- ✅ Added error handling
- All changes marked with `// MODIFIED:` and `// ADDED:` comments

## 🔗 Data Flow

```
User fills profile in Frontend (port 3000)
          ↓
Frontend saves to Backend API (port 5000)
          ↓
Backend stores in MongoDB
          ↓
User requests recommendations
          ↓
Frontend calls: GET /api/ai/recommend
          ↓
Backend fetches Youth profile from MongoDB
          ↓
Backend transforms to ML format & calls: POST /match-jobs
          ↓
ML API (port 5001) returns job matches
          ↓
Backend transforms response for frontend
          ↓
Frontend displays matching jobs with scores!
```

## 🧪 Testing the Integration

### 1. Test ML API Independently
```bash
curl http://localhost:5001/health
```

**Expected**: `{"status":"healthy","jobs_loaded":761,...}`

### 2. Test Backend to ML API Connection
```bash
# First, get auth token by logging in
# Then:
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/ai/recommend
```

### 3. Test Full Stack
1. Open `http://localhost:3000`
2. Register/Login
3. Fill your profile (skills, education, experience)
4. Navigate to recommendations page
5. Should see AI-matched jobs!

## 📝 All Code Changes

### 1. ML API (`SIHProject/app.py`)
- **Line 197**: Changed default port from 5000 to 5001
  ```python
  # MODIFIED: Changed default port from 5000 to 5001 to avoid conflict with backend
  port = int(os.environ.get('PORT', 5001))
  ```

### 2. Backend (`sih_backend/controllers/aiController.js`)
- **Entire file rewritten** to call ML API
- Transforms Youth model (`skills`, `qualification`, `experience`) to ML API format
- Calls `http://localhost:5001/match-jobs`
- Returns formatted recommendations

### 3. Frontend (`sih_frontend/src/recommendation-results.jsx`)
- **Removed**: Mock data generation function
- **Added**: `useEffect` hook to fetch from backend
- **Added**: Loading, error, and empty states
- **Modified**: Transforms ML response to UI format

## 🎨 Helper Scripts

Three batch scripts created for easy startup:

- `SIHProject/start_ml_api.bat` - Starts ML API on port 5001
- `sih_backend/start_backend.bat` - Starts backend on port 5000
- `sih_frontend/start_frontend.bat` - Starts frontend on port 3000

## ⚠️ Troubleshooting

### Port Already in Use
- ML API won't start if something else is on port 5001
- Backend won't start if something else is on port 5000
- Kill existing processes or change ports

### ML API Connection Failed
- Ensure ML API is running (`curl http://localhost:5001/health`)
- Check backend `.env` has `ML_API_URL=http://localhost:5001`

### Frontend Shows Loading Forever
- Check browser console for errors
- Ensure you're logged in (auth token in localStorage)
- Ensure backend is running and reachable

### No Recommendations Returned
- User must have profile data (skills, qualification, experience)
- Check backend logs for ML API errors
- Verify ML API has job database loaded

## 📊 System Status

- ✅ ML API updated and tested
- ✅ Backend integration complete with detailed comments
- ✅ Frontend updated with API calls and error handling
- ✅ All components ready to run
- ⏳ Waiting for end-to-end testing

## 🔐 Security Notes

- Backend requires JWT authentication for `/api/ai/recommend`
- Token stored in localStorage on frontend
- CORS configured for localhost:3000
- For production, update CORS origins and use HTTPS

## 📚 Next Steps

1. Ensure MongoDB is running and `.env` is configured
2. Start all 3 services in order (ML API → Backend → Frontend)
3. Test complete user flow
4. Verify job recommendations appear correctly
5. Deploy to production if testing successful!

---

**All code changes are marked with comments as requested:**
- `// MODIFIED:` - Changed existing code
- `// ADDED:` - New code added
- `// REMOVED:` - Code that was removed

Happy coding! 🚀
