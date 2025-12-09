# Integration Guide - Frontend & Backend

## System Architecture

This application consists of:

1. **Backend API** (`sih_backend/`) - Express + MongoDB - Port **5000**
2. **Frontend** (`sih_frontend/`) - React application - Port **3000**

---

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- MongoDB connection string

### Step 1: Start Backend (Port 5000)

```bash
cd sih_backend
npm install
node server.js
```

### Step 2: Start Frontend (Port 3000)

```bash
cd sih_frontend
npm install
npm start
```

---

## Components

### Backend (sih_backend/)

**Routes:**
- `/api/auth/*` - Authentication endpoints
- `/api/youth/*` - Youth profile management

**Key Files:**
- ✅ `server.js` - Main server with CORS configuration
- ✅ `config/db.js` - MongoDB connection
- ✅ `controllers/authController.js` - Authentication logic
- ✅ `models/Youth.js` - User data model

### Frontend (sih_frontend/)

**Pages:**
- Login page
- Registration form
- User dashboard
- Profile display

---

## Data Flow

```
User fills form
↓
Frontend (React)
↓
Backend (Express)
↓
MongoDB
↓
Backend returns data
↓
Frontend displays
```

---

## Environment Variables

### Backend `.env`

```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

---

## Testing

### Test Backend

```bash
curl http://localhost:5000
```

Expected: `Youth Registration Backend Running 🚀`

### Test Frontend

Open browser: `http://localhost:3000`

Expected: Homepage with login button

---

## Troubleshooting

### Port Already in Use

- Check if another process is using port 5000 or 3000
- Kill the process or change the port

### MongoDB Connection Failed

- Verify MongoDB connection string
- Check network connectivity
- Ensure database exists

---

## Summary

- ✅ Backend and Frontend integrated
- ✅ MongoDB for data storage
- ✅ JWT authentication
- ✅ User profile management
