import { chatWithAI } from "../services/groqService.js";

export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await chatWithAI(message);

    res.json({
      success: true,
      reply,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};