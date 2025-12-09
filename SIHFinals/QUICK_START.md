# Quick Start Guide - Frontend & Backend Only

## Services Overview

| Service | Port | Status | URL |
|---------|------|--------|-----|
| **Backend** | 5000 | Running | http://localhost:5000 |  
| **Frontend** | 3000 | Running | http://localhost:3000 |

---

## Starting the Application

### 1. Backend Server (`sih_backend/`)

**Start:**
```bash
cd sih_backend
node server.js
```

**Features:**
- User authentication & profile management
- MongoDB connection
- REST API endpoints
- CORS configured

---

### 2. Frontend (`sih frontend/`)

**Start:**
```bash
cd sih_frontend
npm start
```

**Features:**
- React application
- User registration & login
- Dashboard UI
- Profile management

---

## API Flow

```
User → Frontend (3000)
Frontend → Backend (5000) → MongoDB
Backend → Frontend  
Frontend → User
```

---

## Modified Files

**Backend:**
- `sih_backend/server.js` - Added routes and CORS
- `sih_backend/routes/authRoutes.js` - Authentication
- `sih_backend/routes/youthRoutes.js` - Profile management
- `sih_backend/controllers/authController.js` - Auth logic
- `sih_backend/models/Youth.js` - User model

**Frontend:**
- `sih_frontend/src/loginpage/LoginAndDashboard.jsx` - Login & Dashboard
- `sih_frontend/src/services/jobMatchingService.js` - API service layer

---

## Success Indicators

✅ Backend connects to MongoDB
✅ Frontend loads without errors
✅ User can register and login
✅ Dashboard displays user profile
