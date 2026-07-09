import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("name avatar xp level streak")
      .sort({ xp: -1 })
      .limit(20);

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};