import { usePractice } from "../../context/PracticeContext";

function FeedbackCard() {
  const { analysis } = usePractice();

  return (
    <div className="mt-8 rounded-2xl bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-white">
        AI Feedback
      </h2>

      {!analysis ? (
        <p className="text-slate-400">
          Feedback will appear here after analysis.
        </p>
      ) : (
        <ul className="space-y-3">
          {analysis.feedback.map((item, index) => (
            <li
              key={index}
              className="rounded-lg bg-slate-800 p-4 text-slate-300"
            >
              ✅ {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FeedbackCard;