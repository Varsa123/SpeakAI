import Practice from "../models/Practice.js";
import User from "../models/User.js";
import { updateBadges } from "../utils/achievementEngine.js";

export const savePractice = async (req, res) => {
  try {
    const {
      transcript,
      grammar,
      fluency,
      vocabulary,
      confidence,
      feedback,
      duration,
      words,
      wpm,
    } = req.body;

    // ==========================
    // Save Practice Session
    // ==========================

    const practice = await Practice.create({
      user: req.user.id,
      transcript,
      grammar,
      fluency,
      vocabulary,
      confidence,
      feedback,
      duration,
      words,
      wpm,
    });

    // ==========================
    // Get User
    // ==========================

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================
    // Daily Streak
    // ==========================

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!user.lastPracticeDate) {
      user.streak = 1;
    } else {
      const lastDate = new Date(user.lastPracticeDate);
      lastDate.setHours(0, 0, 0, 0);

      const diff = Math.floor(
        (today - lastDate) / (1000 * 60 * 60 * 24)
      );

      if (diff === 1) {
        user.streak += 1;
      } else if (diff > 1) {
        user.streak = 1;
      }
    }

    user.lastPracticeDate = new Date();

    // ==========================
    // XP & Level
    // ==========================

    const oldLevel = user.level || 1;

    user.xp = (user.xp || 0) + 10;

    user.level = Math.floor(user.xp / 100) + 1;

    const leveledUp = user.level > oldLevel;

    // ==========================
    // Calculate Stats
    // ==========================

    const sessions = await Practice.find({
      user: req.user.id,
    });

    const stats = {
      totalSessions: sessions.length,

      totalPracticeTime: sessions.reduce(
        (sum, s) => sum + (s.duration || 0),
        0
      ),

      bestGrammar:
        sessions.length > 0
          ? Math.max(...sessions.map((s) => s.grammar || 0))
          : 0,

      bestWPM:
        sessions.length > 0
          ? Math.max(...sessions.map((s) => s.wpm || 0))
          : 0,
    };
    const oldBadges = [...(user.badges || [])];

    // ==========================
    // Unlock Badges
    // ==========================

    updateBadges(user, stats);

    const newBadges = user.badges.filter(
  badge => !oldBadges.includes(badge)
);
    res.status(201).json({
  success: true,
  practice,
  xp: user.xp,
  level: user.level,
  streak: user.streak,
  badges: user.badges,
  newBadges,
  leveledUp,
});

    // ==========================
    // Save User
    // ==========================

    await user.save();

    // ==========================
    // Response
    // ==========================

    res.status(201).json({
      success: true,
      practice,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      badges: user.badges,
      leveledUp,
    });
  } catch (err) {
    console.error("===== PRACTICE SAVE ERROR =====");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
};

export const getPractices = async (req, res) => {
  try {
    const practices = await Practice.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(practices);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};