import { Mic } from "lucide-react";

function Loader({ text = "Loading..." }) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-950 px-4">
      {/* Animated Circle */}
      <div className="relative">
        <div className="h-24 w-24 animate-spin rounded-full border-4 border-indigo-500/20 border-t-indigo-500"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Mic className="h-10 w-10 animate-pulse text-indigo-400" />
        </div>
      </div>

      {/* Branding */}
      <h2 className="mt-8 text-3xl font-bold text-white">
        🎤 SpeakAI
      </h2>

      <p className="mt-3 animate-pulse text-slate-400">
        {text}
      </p>
    </div>
  );
}

export default Loader;