import User from "../models/User.js";
import Practice from "../models/Practice.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const sessions = await Practice.find({
      user: req.user.id,
    });

    const totalSessions = sessions.length;

    const bestGrammar =
      totalSessions > 0
        ? Math.max(...sessions.map((s) => s.grammar || 0))
        : 0;

    const averageWPM =
      totalSessions > 0
        ? Math.round(
            sessions.reduce((sum, s) => sum + (s.wpm || 0), 0) /
              totalSessions
          )
        : 0;

    const totalPracticeTime = sessions.reduce(
      (sum, s) => sum + (s.duration || 0),
      0
    );

    res.json({
      user,
      stats: {
        totalSessions,
        bestGrammar,
        averageWPM,
        totalPracticeTime,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};