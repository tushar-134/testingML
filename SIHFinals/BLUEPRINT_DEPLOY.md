# Render Blueprint Deployment via render.yaml

Since the Render CLI isn't installing properly, here's the best approach:

## Option: Use Render Dashboard with render.yaml (Easiest!)

Your repo already has `sih_backend/render.yaml` configured with all settings.

### Steps:

1. **Open Render Dashboard**:
   ```powershell
   Start-Process "https://dashboard.render.com/blueprints"
   ```

2. **Click "New Blueprint Instance"**

3. **Connect Repository**: Select `tushar-134/testingML`

4. **Render will Auto-detect render.yaml**
   - It reads all configuration from the file
   - You just need to provide the secret environment variables

5. **Set Environment Variables** (prompted):
   ```
   MONGO_URI = mongodb+srv://sih_user:K6dJmnBUcBs8_Y_@cluster0.yb1popv.mongodb.net/sih_database?retryWrites=true&w=majority
   
   JWT_SECRET = cBjCrnK43UDZPxHS1kflNaopJETz6L8M
   
   ML_API_URL = (leave empty for now)
   
   FRONTEND_URL = (leave empty for now)
   
   FAST2SMS_API_KEY = bvpqR24N9yU0HlfdODESAMBx6C5izYFKnsuGtoW7jgIJQc8kw3
   ```

6. **Click "Apply"**

That's it! Render will deploy using your render.yaml automatically.

---

## Why This is Better Than CLI:

✅ No CLI installation needed  
✅ Uses your existing render.yaml  
✅ All settings pre-configured  
✅ Just set environment variables and click Apply  

---

**This is the recommended approach. Shall I open the Blueprint page for you?**
