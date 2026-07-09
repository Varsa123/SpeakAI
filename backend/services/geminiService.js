import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeSpeech(transcript) {
  const prompt = `
You are an English speaking coach.

Analyze the following transcript and return ONLY valid JSON.

Transcript:
"${transcript}"

Format:

{
  "grammar": 90,
  "fluency": 88,
  "vocabulary": 85,
  "confidence": 87,
  "feedback": [
    "Feedback 1",
    "Feedback 2",
    "Feedback 3"
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}