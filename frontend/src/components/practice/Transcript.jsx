import { usePractice } from "../../context/PracticeContext";

function Transcript() {
  const { transcript } = usePractice();

  return (
    <div className="mt-8 rounded-2xl bg-slate-900 p-6">

      <h2 className="mb-4 text-xl font-bold text-white">
        Transcript
      </h2>

      <div className="min-h-[180px] rounded-xl bg-slate-800 p-4 text-slate-300">
        {transcript || "Start speaking to see your transcript..."}
      </div>

    </div>
  );
}

export default Transcript;