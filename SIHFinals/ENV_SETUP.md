# Environment Setup Guide

## Quick Setup

### 1. Backend Environment (.env)

```bash
cd sih_backend
cp .env.example .env
```

Then edit `.env` with your actual values:
- MongoDB connection string
- JWT secret key
- Twilio credentials (for OTP)
- Frontend URL (for CORS)

### 2. Frontend Environment (.env)

```bash
cd sih_frontend
cp .env.example .env
```

Then edit `.env` with your actual values:
- Backend API URL (http://localhost:5000 for local)

---

## Environment Variables Explained

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `PORT` | Backend server port | `5000` |
| `JWT_SECRET` | Secret key for JWT tokens | Any long random string |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | From Twilio dashboard |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | From Twilio dashboard |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | From Twilio dashboard |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `ML_API_URL` | ML API endpoint (optional) | `http://localhost:5001` or external URL |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | Backend API base URL | `http://localhost:5000` |
| `REACT_APP_ML_API_URL` | ML API URL (optional) | External ML service URL |

---

## Security Notes

⚠️ **NEVER commit `.env` files to Git!**

- `.env` files are in `.gitignore`
- Only `.env.example` templates should be in Git
- Each developer creates their own `.env` from `.env.example`

---

## Production Deployment

For Render deployment, set environment variables in Render dashboard instead of using `.env` files.

See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for details.
