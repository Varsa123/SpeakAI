import AchievementCard from "./AchievementCard";

const achievements = [
  {
    icon: "🔥",
    title: "3 Day Streak",
    description: "Practiced 3 consecutive days",
  },
  {
    icon: "🎤",
    title: "50 Sessions",
    description: "Completed 50 speaking sessions",
  },
  {
    icon: "⭐",
    title: "Grammar Master",
    description: "Grammar above 90%",
  },
];

function Achievements() {
  return (
    <div className="mt-10">
      <h2 className="mb-6 text-3xl font-bold text-white">
        🏆 Achievements
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {achievements.map((item) => (
          <AchievementCard
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Achievements;