import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    streak: {
      type: Number,
      default: 0,
    },

    totalPractice: {
      type: Number,
      default: 0,
    },

    averageScore: {
      type: Number,
      default: 0,
    },
    streak: {
  type: Number,
  default: 0,
},
level: {
  type: Number,
  default: 1,
},
xp: {
  type: Number,
  default: 0,
},
badges: {
  type: [String],
  default: [],
},

lastPracticeDate: {
  type: Date,
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;