import { useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ChatWindow from "../../components/conversation/ChatWindow";
import { sendConversation } from "../../services/api";
import AnimatedPage from "../../components/common/AnimatedPage";

function Conversation() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI English coach. Tell me about yourself.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const [mode, setMode] = useState("HR Interview");

  const [voiceGender, setVoiceGender] = useState("female");
  const [language, setLanguage] = useState("en-US");
  const [speechRate, setSpeechRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language;

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setInput(speech);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.log(event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, []);

  // Update recognition language whenever language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
    }
  }, [language]);

  const startRecording = () => {
    if (!recognitionRef.current) return;

    setIsRecording(true);
    recognitionRef.current.start();
  };

  const speakResponse = async (text) => {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = language;
    utterance.rate = speechRate;
    utterance.pitch = pitch;

    const synth = window.speechSynthesis;

    let voices = synth.getVoices();

    if (!voices.length) {
      await new Promise((resolve) => {
        synth.onvoiceschanged = resolve;
      });

      voices = synth.getVoices();
    }

    const selectedVoice = voices.find((voice) => {
      const name = voice.name.toLowerCase();

      if (!voice.lang.startsWith(language.split("-")[0])) return false;

      if (voiceGender === "female") {
        return (
          name.includes("zira") ||
          name.includes("samantha") ||
          name.includes("female") ||
          name.includes("google")
        );
      }

      return (
        name.includes("david") ||
        name.includes("mark") ||
        name.includes("alex") ||
        name.includes("male")
      );
    });

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    synth.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Send only role/content to backend
      const cleanMessages = updatedMessages.map(({ role, content }) => ({
        role,
        content,
      }));

      const res = await sendConversation(cleanMessages, mode);

      const aiMessage = {
        role: "assistant",
        content: res.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages([...updatedMessages, aiMessage]);

      await speakResponse(res.reply);
    } catch (err) {
      console.log(err);
      alert("Failed to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <AnimatedPage>
      <h1 className="mb-6 text-4xl font-bold text-white">
        AI Conversation
      </h1>

      {/* Conversation Mode */}
      <div className="mb-6">
        <label className="mb-2 block text-white font-semibold">
          Conversation Mode
        </label>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3 text-white"
        >
          <option>HR Interview</option>
          <option>IELTS Speaking</option>
          <option>Casual Chat</option>
          <option>Group Discussion</option>
          <option>Public Speaking</option>
        </select>
      </div>

      {/* Voice Settings */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <select
          value={voiceGender}
          onChange={(e) => setVoiceGender(e.target.value)}
          className="rounded-xl bg-slate-800 p-3 text-white"
        >
          <option value="female">👩 Female</option>
          <option value="male">👨 Male</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-xl bg-slate-800 p-3 text-white"
        >
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="en-IN">English (India)</option>
          <option value="hi-IN">Hindi</option>
          <option value="es-ES">Spanish</option>
          <option value="fr-FR">French</option>
          <option value="de-DE">German</option>
          <option value="ja-JP">Japanese</option>
        </select>

        <select
          value={speechRate}
          onChange={(e) => setSpeechRate(Number(e.target.value))}
          className="rounded-xl bg-slate-800 p-3 text-white"
        >
          <option value={0.75}>0.75x</option>
          <option value={1}>1x</option>
          <option value={1.25}>1.25x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>

        <select
          value={pitch}
          onChange={(e) => setPitch(Number(e.target.value))}
          className="rounded-xl bg-slate-800 p-3 text-white"
        >
          <option value={0.8}>Low</option>
          <option value={1}>Normal</option>
          <option value={1.3}>High</option>
        </select>
      </div>

      <ChatWindow messages={messages} loading={loading} />

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="Type or speak..."
          className="flex-1 rounded-xl bg-slate-800 p-4 text-white outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button
          onClick={startRecording}
          className={`rounded-xl px-5 text-white transition ${
            isRecording
              ? "bg-red-600 animate-pulse"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <FaMicrophone />
        </button>

        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
      </AnimatedPage>
    </DashboardLayout>
  );
}

export default Conversation;