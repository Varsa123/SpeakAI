function Card({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-500/20">

      <h3 className="text-sm text-slate-400 sm:text-base">
        {title}
      </h3>

      <p className="mt-2 break-words text-2xl font-bold text-indigo-400 sm:text-3xl lg:text-4xl">
        {value}
      </p>

    </div>
  );
}

function StatsCards({ stats }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      <Card
        title="📖 Grammar"
        value={`${stats.averageGrammar.toFixed(2)}%`}
      />

      <Card
        title="🗣️ Fluency"
        value={`${stats.averageFluency.toFixed(2)}%`}
      />

      <Card
        title="📚 Vocabulary"
        value={`${stats.averageVocabulary.toFixed(2)}%`}
      />

      <Card
        title="💪 Confidence"
        value={`${stats.averageConfidence.toFixed(2)}%`}
      />

      <Card
        title="🔥 Daily Streak"
        value={`${stats.streak} Days`}
      />

    </div>
  );
}

export default StatsCards;