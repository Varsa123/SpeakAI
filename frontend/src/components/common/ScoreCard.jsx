function ScoreCard({ title, score }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-center transition-all duration-300 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20">
      <h4 className="text-lg font-semibold text-slate-300">
        {title}
      </h4>

      <p className="mt-2 text-3xl font-bold text-indigo-400">
        {score}%
      </p>
    </div>
  );
}

export default ScoreCard;