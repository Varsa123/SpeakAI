import { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { usePractice } from "../../context/PracticeContext";
import { analyzeSpeech, savePractice } from "../../services/api";

function Recorder() {
  const recognitionRef = useRef(null);
  const startTimeRef = useRef(null);

  // Stores only final recognized text
  const finalTranscriptRef = useRef("");

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

    // Better for Android
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("Recording Started...");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";

      // Process ONLY new results
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
      console.log("Speech Error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      console.log("Recording Ended");
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, [setTranscript, setAnalysis]);

  const startRecording = () => {
    if (!recognitionRef.current) return;

    finalTranscriptRef.current = "";

    setTranscript("");
    setAnalysis(null);

    startTimeRef.current = Date.now();

    recognitionRef.current.start();

    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();

    setIsRecording(false);

    const finalTranscript = finalTranscriptRef.current.trim();

    if (!finalTranscript) return;

    const duration = Math.max(
      1,
      Math.round(
        (Date.now() - startTimeRef.current) / 1000
      )
    );

    const words = finalTranscript.split(/\s+/).length;

    const wpm = Math.round((words / duration) * 60);

    try {
      setLoading(true);

      const response = await analyzeSpeech(finalTranscript);

      console.log(response);

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
          ? "🎤 Listening... Speak now"
          : "Click the microphone to start speaking"}

      </p>

      <div className="mt-8 rounded-xl bg-slate-800 p-5">

        <h3 className="mb-3 text-xl font-semibold text-white">
          Transcript
        </h3>

        <p className="min-h-[120px] whitespace-pre-wrap text-slate-300">
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