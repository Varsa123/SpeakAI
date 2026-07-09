import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import practiceRoutes from "./routes/practiceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config();

connectDB();

const app = express();

// ==============================
// CORS Configuration
// ==============================
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-app.vercel.app", // Replace after frontend deployment
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/challenge", challengeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// ==============================
// Health Check
// ==============================

app.get("/", (req, res) => {
  res.send("SpeakAI Backend Running 🚀");
});

// ==============================
// Global Error Handler
// ==============================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});