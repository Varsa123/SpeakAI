import mongoose from "mongoose";

const practiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    transcript: {
      type: String,
      required: true,
    },

    grammar: Number,
    fluency: Number,
    vocabulary: Number,
    confidence: Number,

    feedback: [String],

    duration: {
      type: Number,
      default: 0,
    },

    words: {
      type: Number,
      default: 0,
    },

    wpm: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Practice", practiceSchema);