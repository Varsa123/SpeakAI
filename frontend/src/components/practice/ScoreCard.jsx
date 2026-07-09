import { usePractice } from "../../context/PracticeContext";

function ScoreCard() {
  const { analysis } = usePractice();

  if (!analysis) {
    return (
      <div className="rounded-2xl bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">
          AI Score
        </h2>

        <p className="text-slate-400">
          Complete a practice session to view your scores.
        </p>
      </div>
    );
  }

  const overall = Math.round(
    (
      analysis.grammar +
      analysis.fluency +
      analysis.vocabulary +
      analysis.confidence
    ) / 4
  );

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Score
      </h2>

      <div className="mb-6 text-center">
        <div className="text-6xl font-bold text-indigo-400">
          {overall}/10
        </div>

        <p className="mt-2 text-slate-400">
          Overall Score
        </p>
      </div>

      <div className="space-y-4">

        <ScoreRow title="Grammar" value={analysis.grammar} />

        <ScoreRow title="Fluency" value={analysis.fluency} />

        <ScoreRow title="Vocabulary" value={analysis.vocabulary} />

        <ScoreRow title="Confidence" value={analysis.confidence} />

      </div>
    </div>
  );
}

function ScoreRow({ title, value }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-white">
        <span>{title}</span>
        <span>{value}/10</span>
      </div>

      <div className="h-2 rounded-full bg-slate-700">
        <div
          className="h-2 rounded-full bg-indigo-500"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}

export default ScoreCard;