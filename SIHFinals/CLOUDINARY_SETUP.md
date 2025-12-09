# Cloudinary Setup Instructions

## Update Your Environment Variables

Open the file: `sih_backend/.env`

Add or update these lines with your Cloudinary credentials:

```env
CLOUD_NAME=986769664613333
CLOUD_API_KEY=yM6bWiC2NU-Fn7uQk
CLOUD_API_SECRET=yM6bWiC2NU-Fn7uQk
```

## Restart Backend Server

After updating the `.env` file:

1. Stop the backend server (Ctrl+C in the terminal running `node server.js`)
2. Restart it: `cd sih_backend && node server.js`

## Verify Configuration

The Cloudinary setup in `sih_backend/config/cloudinary.js` will automatically read these environment variables.

File uploads (Aadhar, Photo) in the youth form will now be stored in your Cloudinary account!

---

**Note**: Keep your API secret secure and never commit the `.env` file to Git (it's already in `.gitignore`).
