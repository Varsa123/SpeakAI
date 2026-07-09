function Card({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
      <h3 className="text-slate-400">{title}</h3>

      <p className="mt-3 text-4xl font-bold text-indigo-400">
        {value}
      </p>
    </div>
  );
}

function StatsCards({ stats }) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      <Card
        title="Grammar"
        value={`${stats.averageGrammar.toFixed(2)}%`}
      />

      <Card
        title="Fluency"
        value={`${stats.averageFluency.toFixed(2)}%`}
      />

      <Card
        title="Vocabulary"
        value={`${stats.averageVocabulary.toFixed(2)}%`}
      />

      <Card
        title="Confidence"
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