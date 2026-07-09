function StatsCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20">
      <h3 className="text-3xl font-bold text-white">
        {value}
      </h3>

      <p className="mt-2 text-slate-400">
        {label}
      </p>
    </div>
  );
}

export default StatsCard;