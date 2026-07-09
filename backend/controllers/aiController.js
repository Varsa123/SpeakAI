import { analyzeSpeech } from "../services/groqService.js";

export const analyze = async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({
        success: false,
        message: "Transcript is required",
      });
    }

    const response = await analyzeSpeech(transcript);

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(cleaned);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("===== AI ERROR =====");
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};