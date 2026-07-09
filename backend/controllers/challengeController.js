const challenges = [
  "Introduce yourself in 60 seconds.",
  "Describe your dream job.",
  "Explain your favorite movie.",
  "Talk about your hometown.",
  "Describe a difficult situation you solved.",
  "Why should we hire you?",
  "What are your strengths and weaknesses?",
  "Describe your best friend.",
  "Talk about your biggest achievement.",
  "Explain your future goals."
];

export const getDailyChallenge = (req, res) => {
  const day =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24));

  const challenge = challenges[day % challenges.length];

  res.json({
    challenge,
  });
};