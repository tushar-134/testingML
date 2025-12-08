import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import youthRoutes from "./routes/youthRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// CORS Configuration
// MODIFIED: Added production frontend URL support via environment variable
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001'
];

// Add production frontend URL if provided
if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/youth", youthRoutes);
app.use("/api/ai", aiRoutes);

// ADDED: Test endpoint for ML model (no authentication required)
app.post("/api/test-ml", async (req, res) => {
    try {
        const testData = req.body || {
            position: "Software Engineer",
            skills: "Python, JavaScript, Machine Learning, React",
            summary: "Experienced developer with expertise in full-stack development and ML",
            qualification: "B.Tech Computer Science",
            experience: "2 years",
            work_experience: "Worked on web applications and ML models at tech startups"
        };

        console.log("🧪 Testing ML API with data:", testData);

        const ML_API_URL = process.env.ML_API_URL || "http://localhost:5001";
        const response = await fetch(`${ML_API_URL}/match-jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testData)
        });

        if (!response.ok) {
            throw new Error(`ML API returned status ${response.status}`);
        }

        const result = await response.json();

        res.json({
            success: true,
            message: "ML API is working!",
            ml_response: result,
            test_data: testData
        });
    } catch (error) {
        console.error("❌ ML Test Error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/", (req, res) => {
    res.send("Youth Registration Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
