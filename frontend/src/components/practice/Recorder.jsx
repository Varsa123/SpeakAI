import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { usePractice } from "../../context/PracticeContext";
import { analyzeSpeech, savePractice } from "../../services/api";

function Recorder() {
  const recognitionRef = useRef(null);
  const startTimeRef = useRef(null);

  const {
    transcript,
    setTranscript,
    setAnalysis,
    loading,
    setLoading,
  } = usePractice();

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript + " ";
      }

      setTranscript(finalTranscript.trim());
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.log(event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, [setTranscript]);

  const startRecording = () => {
  setTranscript("");
  setAnalysis(null);

  // Save recording start time
  startTimeRef.current = Date.now();

  recognitionRef.current.start();
  setIsRecording(true);
};

  const stopRecording = async () => {
    recognitionRef.current.stop();
    setIsRecording(false);

    if (!transcript.trim()) return;
    const duration = Math.round(
  (Date.now() - startTimeRef.current) / 1000
);

const words = transcript.trim().split(/\s+/).length;

const wpm =
  duration > 0
    ? Math.round((words / duration) * 60)
    : 0;

    try {
      setLoading(true);

      const response = await analyzeSpeech(transcript);

console.log(response);

setAnalysis(response.data);

const result = await savePractice({
  transcript,
  grammar: response.data.grammar,
  fluency: response.data.fluency,
  vocabulary: response.data.vocabulary,
  confidence: response.data.confidence,
  feedback: response.data.feedback,
  duration,
  words,
  wpm,
});
if (result.newBadges?.length) {
  alert(
    `🎉 Congratulations!\n\n${result.newBadges.join("\n")}`
  );
}

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "AI analysis failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900 p-8">

      <h2 className="mb-6 text-3xl font-bold text-white">
        Speaking Practice
      </h2>

      <div className="flex justify-center">

        {!isRecording ? (
          <button
            onClick={startRecording}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-4xl text-white transition hover:scale-105 hover:bg-indigo-700"
          >
            <FaMicrophone />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-red-600 text-4xl text-white transition hover:scale-105 hover:bg-red-700"
          >
            <FaStop />
          </button>
        )}

      </div>

      <p className="mt-5 text-center text-slate-400">

        {isRecording
          ? "Listening... Speak now 🎤"
          : "Click the microphone to start speaking"}

      </p>

      <div className="mt-8 rounded-xl bg-slate-800 p-5">

        <h3 className="mb-3 text-xl font-semibold text-white">
          Transcript
        </h3>

        <p className="min-h-[80px] text-slate-300">
          {transcript || "Your speech will appear here..."}
        </p>

      </div>

      {loading && (
        <div className="mt-6 rounded-lg bg-indigo-500/20 p-4 text-center text-indigo-300">
          🤖 AI is analyzing your speech...
        </div>
      )}

    </div>
  );
}

export default Recorder;