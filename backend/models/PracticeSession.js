import mongoose from "mongoose";

const practiceSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    transcript: String,

    grammar: Number,

    fluency: Number,

    vocabulary: Number,

    confidence: Number,

    feedback: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "PracticeSession",
  practiceSessionSchema
);