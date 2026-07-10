import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { usePractice } from "../../context/PracticeContext";
import { analyzeSpeech, savePractice } from "../../services/api";
import toast from "react-hot-toast";

function Recorder() {
  const recognitionRef = useRef(null);
  const startTimeRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const analyzedRef = useRef(false);

  const {
    transcript,
    setTranscript,
    setAnalysis,
    loading,
    setLoading,
  } = usePractice();

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState("");

  // ==========================
  // Recording Timer
  // ==========================
  useEffect(() => {
    let interval;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  // ==========================
  // Analyze Speech
  // ==========================
  async function analyzeCurrentSpeech() {
    if (analyzedRef.current) return;

    analyzedRef.current = true;

    const finalTranscript = finalTranscriptRef.current.trim();

    if (!finalTranscript) {
      const message = "No speech detected.";
      setError(message);
      toast.error(message);
      return;
    }

    const duration = Math.max(
      1,
      Math.round((Date.now() - startTimeRef.current) / 1000)
    );

    const words = finalTranscript.split(/\s+/).length;

    const wpm = Math.round((words / duration) * 60);

    try {
      setLoading(true);

      const response = await analyzeSpeech(finalTranscript);

      setAnalysis(response.data);

      await savePractice({
        transcript: finalTranscript,
        grammar: response.data.grammar,
        fluency: response.data.fluency,
        vocabulary: response.data.vocabulary,
        confidence: response.data.confidence,
        feedback: response.data.feedback,
        duration,
        words,
        wpm,
      });

      toast.success("Practice analyzed successfully!");

      setRecordingTime(0);
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.message ||
        "AI analysis failed.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // Speech Recognition
  // ==========================
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const message =
        "Speech Recognition is not supported in this browser.";

      setTimeout(() => {
        setError(message);
        toast.error(message);
      }, 0);

      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Recording Started");
      toast.success("🎤 Listening...");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscriptRef.current += text + " ";
        } else {
          interimTranscript += text;
        }
      }

      setTranscript(
        (finalTranscriptRef.current + interimTranscript).trim()
      );
    };

    recognition.onerror = (event) => {
      console.error(event.error);

      setIsRecording(false);

      if (event.error !== "no-speech") {
        const message = "Speech recognition failed.";

        setError(message);
        toast.error(message);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);

      if (!analyzedRef.current) {
        setTimeout(analyzeCurrentSpeech, 500);
      }
    };

    recognitionRef.current = recognition;
  }, []);

  // ==========================
  // Start Recording
  // ==========================
  const startRecording = () => {
    if (!recognitionRef.current) return;

    if (loading || isRecording) return;

    analyzedRef.current = false;
    finalTranscriptRef.current = "";

    setTranscript("");
    setAnalysis(null);

    setRecordingTime(0);
    setError("");

    startTimeRef.current = Date.now();

    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch {
      toast.error("Microphone is already running.");
    }
  };

  // ==========================
  // Stop Recording
  // ==========================
  const stopRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl sm:p-8">
      <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
        🎤 Speaking Practice
      </h2>

      <div className="flex justify-center">
        {!isRecording ? (
          <button
            disabled={loading}
            onClick={startRecording}
            className={`flex h-24 w-24 items-center justify-center rounded-full text-4xl text-white transition-all duration-300 ${
              loading
                ? "cursor-not-allowed bg-slate-600"
                : "bg-indigo-600 hover:scale-110 hover:bg-indigo-700"
            }`}
          >
            <FaMicrophone />
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-red-600 text-4xl text-white transition hover:scale-110 hover:bg-red-700"
          >
            <FaStop />
          </button>
        )}
      </div>

      <p className="mt-5 text-center text-slate-400">
        {isRecording
          ? `🎙 Recording... ${recordingTime}s`
          : "Click the microphone to start speaking"}
      </p>

      <div className="mt-8 rounded-2xl bg-slate-800 p-5 shadow-inner">
        <h3 className="mb-3 text-xl font-semibold text-white">
          Transcript
        </h3>

        <div className="min-h-[180px] max-h-[250px] overflow-y-auto rounded-lg bg-slate-900 p-4">
          <p className="whitespace-pre-wrap text-slate-300">
            {transcript || "Your speech will appear here..."}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl bg-red-500/20 p-4 text-center text-red-300">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-6 animate-pulse rounded-xl bg-indigo-500/20 p-4 text-center text-indigo-300">
          🤖 AI is analyzing your speech...
          <br />
          Please wait a few seconds.
        </div>
      )}
    </div>
  );
}

export default Recorder;