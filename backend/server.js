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
console.log("Groq Key:", process.env.GROQ_API_KEY);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/challenge", challengeRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.get("/", (req, res) => {
  res.send("SpeakAI Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});