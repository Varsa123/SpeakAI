import { usePractice } from "../../context/PracticeContext";

function AnalysisCard() {
  const { analysis, loading } = usePractice();

  if (loading)
    return (
      <div className="rounded-xl bg-slate-900 p-6 mt-6 text-white">
        Analyzing...
      </div>
    );

  if (!analysis) return null;

  return (
    <div className="mt-6 rounded-xl bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Analysis
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-lg bg-slate-800 p-4">
          <h3 className="text-slate-400">Grammar</h3>
          <p className="text-3xl text-white">
            {analysis.grammar}
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4">
          <h3 className="text-slate-400">Fluency</h3>
          <p className="text-3xl text-white">
            {analysis.fluency}
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4">
          <h3 className="text-slate-400">Vocabulary</h3>
          <p className="text-3xl text-white">
            {analysis.vocabulary}
          </p>
        </div>

        <div className="rounded-lg bg-slate-800 p-4">
          <h3 className="text-slate-400">Confidence</h3>
          <p className="text-3xl text-white">
            {analysis.confidence}
          </p>
        </div>

      </div>

      <div className="mt-6">

        <h3 className="mb-3 text-xl text-white">
          Feedback
        </h3>

        <ul className="space-y-2">

          {analysis.feedback.map((item, index) => (
            <li
              key={index}
              className="rounded-lg bg-slate-800 p-3 text-slate-300"
            >
              {item}
            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}

export default AnalysisCard;