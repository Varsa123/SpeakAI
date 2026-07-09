import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {protect} from "../middleware/authMiddleware.js";
import { uploadAvatar } from "../controllers/uploadController.js";

const router = express.Router();

router.post(
  "/avatar",
  protect,
  upload.single("avatar"),
  uploadAvatar
);

export default router;