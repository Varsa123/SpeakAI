import { chatWithAI } from "../services/groqService.js";

export const chat = async (req, res) => {
  try {
    const { messages, mode } = req.body;

    if (!messages || messages.length === 0) {
      return res.status(400).json({
        message: "Messages are required",
      });
    }

    const reply = await chatWithAI(messages, mode);

    res.json({
      reply,
    });
  } catch (err) {
    console.error("===== CONVERSATION ERROR =====");
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};