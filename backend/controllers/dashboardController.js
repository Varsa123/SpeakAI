import Practice from "../models/Practice.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const sessions = await Practice.find({
      user: req.user.id,
    }).sort({ createdAt: 1 });
    const user = await User.findById(req.user.id);

    if (sessions.length === 0) {
      return res.json({
  totalSessions: 0,
  averageGrammar: 0,
  averageFluency: 0,
  averageVocabulary: 0,
  averageConfidence: 0,
  averageWPM: 0,
  totalPracticeTime: 0,
  bestGrammar: 0,
  streak: user?.streak || 0,
  chart: [],
});
    }

    const totalSessions = sessions.length;

    const averageGrammar =
      sessions.reduce((sum, s) => sum + s.grammar, 0) /
      totalSessions;

    const averageFluency =
      sessions.reduce((sum, s) => sum + s.fluency, 0) /
      totalSessions;

    const averageVocabulary =
      sessions.reduce((sum, s) => sum + s.vocabulary, 0) /
      totalSessions;

    const averageConfidence =
      sessions.reduce((sum, s) => sum + s.confidence, 0) /
      totalSessions;

    const chart = sessions
  .slice(0, 7)
  .reverse()
  .map((session) => ({
    day: new Date(session.createdAt).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    grammar: session.grammar,
  }));

  const averageWPM =
  totalSessions > 0
    ? Math.round(
        sessions.reduce((sum, session) => sum + (session.wpm || 0), 0) /
          totalSessions
      )
    : 0;
    const totalPracticeTime = sessions.reduce(
  (sum, session) => sum + (session.duration || 0),
  0
);

const bestGrammar =
  sessions.length > 0
    ? Math.max(...sessions.map((session) => session.grammar || 0))
    : 0;

    res.json({
  totalSessions,
  averageGrammar,
  averageFluency,
  averageVocabulary,
  averageConfidence,
  averageWPM,
  totalPracticeTime,
  bestGrammar,
  streak: user.streak,
  chart,
});

  } catch (err) {
  console.error("===== DASHBOARD ERROR =====");
  console.error(err);

  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
};
