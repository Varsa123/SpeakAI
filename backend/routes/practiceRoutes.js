import express from "express";
import {
  savePractice,
  getPractices,
} from "../controllers/practiceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, savePractice);

router.get("/", protect, getPractices);

export default router;