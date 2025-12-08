import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { recommendInternships } from "../controllers/aiController.js";

const router = express.Router();

router.get("/recommend", protect, recommendInternships);

export default router;
