import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDailyChallenge } from "../controllers/challengeController.js";

const router = express.Router();

router.get("/", protect, getDailyChallenge);

export default router;