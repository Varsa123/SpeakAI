import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getPracticeHistory,
  downloadReport,
} from "../../services/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getPracticeHistory();
      setHistory(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async (id) => {
    try {
      const pdf = await downloadReport(id);

      const url = window.URL.createObjectURL(
        new Blob([pdf], { type: "application/pdf" })
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "SpeakAI_Report.pdf";

      document.body.appendChild(link);
      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
      alert("Unable to download report.");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold text-white">
        Practice History
      </h1>

      <div className="space-y-6">
        {history.length === 0 && (
          <div className="rounded-xl bg-slate-900 p-8 text-center text-slate-400">
            No practice sessions yet.
          </div>
        )}

        {history.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl bg-slate-900 p-6"
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-white">
                {new Date(item.createdAt).toLocaleDateString()}
              </h2>

              <span className="text-slate-400">
                {new Date(item.createdAt).toLocaleTimeString()}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Score title="Grammar" value={item.grammar} />
              <Score title="Fluency" value={item.fluency} />
              <Score title="Vocabulary" value={item.vocabulary} />
              <Score title="Confidence" value={item.confidence} />
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-white">
                Transcript
              </h3>

              <p className="mt-2 text-slate-300">
                {item.transcript}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-white">
                AI Feedback
              </h3>

              <ul className="mt-3 space-y-2">
                {item.feedback?.map((f, index) => (
                  <li
                    key={index}
                    className="rounded-lg bg-slate-800 p-3 text-slate-300"
                  >
                    ✓ {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Practice Details */}

            <div className="mt-6 grid grid-cols-3 gap-4">
              <Score title="Duration" value={`${item.duration}s`} />
              <Score title="Words" value={item.words} />
              <Score title="WPM" value={item.wpm} />
            </div>

            {/* Download Button */}

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => handleDownload(item._id)}
                className="rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
              >
                📄 Download Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

function Score({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-800 p-5 text-center">
      <p className="text-slate-400">{title}</p>

      <p className="mt-2 text-3xl font-bold text-indigo-400">
        {value}
      </p>
    </div>
  );
}

export default History;