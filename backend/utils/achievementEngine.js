export const updateBadges = (user, stats) => {
  const badges = new Set(user.badges);

  if (stats.totalSessions >= 1)
    badges.add("🥇 First Practice");

  if (user.streak >= 7)
    badges.add("🔥 7-Day Streak");

  if (user.xp >= 100)
    badges.add("⭐ 100 XP");

  if (stats.totalSessions >= 50)
    badges.add("🎤 50 Sessions");

  if (stats.totalPracticeTime >= 300 * 60)
    badges.add("⏱ Consistent Speaker");

  if (stats.bestGrammar >= 95)
    badges.add("📚 Grammar Master");

  if (stats.bestWPM >= 140)
    badges.add("⚡ Fast Speaker");

  if (user.level >= 5)
    badges.add("🚀 Level 5");

  if (user.xp >= 5000)
    badges.add("👑 SpeakAI Champion");

  user.badges = [...badges];
};