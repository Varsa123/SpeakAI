import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { downloadReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/:id", protect, downloadReport);

export default router;