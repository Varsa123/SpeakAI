import Groq from "groq-sdk";

function getGroqClient() {
  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

// ============================
// Analyze Speaking Practice
// ============================
export async function analyzeSpeech(transcript) {
  const groq = getGroqClient();

  const prompt = `
You are an expert English speaking coach.

Analyze this transcript.

Transcript:
"${transcript}"

Return ONLY valid JSON.

{
  "grammar": 0,
  "fluency": 0,
  "vocabulary": 0,
  "confidence": 0,
  "feedback": [
    "",
    "",
    ""
  ]
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
  });

  return completion.choices[0].message.content;
}

// ============================
// AI Conversation
// ============================
export async function chatWithAI(messages, mode) {
  const groq = getGroqClient();

  let systemPrompt = "";

  switch (mode) {
    case "HR Interview":
      systemPrompt =
        "You are a professional HR interviewer. Ask ONE interview question at a time. After each answer, give short feedback and then ask the next question.";
      break;

    case "IELTS Speaking":
      systemPrompt =
        "You are an IELTS Speaking examiner. Conduct a realistic IELTS Speaking interview with follow-up questions.";
      break;

    case "Casual Chat":
      systemPrompt =
        "You are a friendly English-speaking partner. Keep the conversation natural, correct mistakes politely, and encourage the learner.";
      break;

    case "Group Discussion":
      systemPrompt =
        "You are participating in a group discussion. Challenge ideas politely, ask questions, and keep the discussion flowing.";
      break;

    case "Public Speaking":
      systemPrompt =
        "You are a public speaking coach. Ask the learner to speak on a topic, then give feedback on clarity, confidence, pronunciation, and structure.";
      break;

    default:
      systemPrompt =
        "You are an English speaking coach helping users improve spoken English.";
  }

  // Remove unsupported properties like "time"
  const cleanMessages = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...cleanMessages,
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}