function AchievementCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5 transition hover:-translate-y-1 hover:bg-slate-800">
      <div className="text-5xl">
        {icon}
      </div>

      <h3 className="mt-4 text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default AchievementCard;