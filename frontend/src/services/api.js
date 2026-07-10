import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ===============================
// Request Interceptor
// Automatically attach JWT Token
// ===============================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// Response Interceptor
// Global Error Handling
// ===============================

API.interceptors.response.use(
  (response) => response,

  (error) => {
    const message =
      error.response?.data?.message ||
      "Something went wrong.";

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.error("Session expired. Please login again.");

      window.location.href = "/login";
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

// ===============================
// Authentication
// ===============================

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

// ===============================
// Dashboard
// ===============================

export const getDashboard = async () => {
  const res = await API.get("/dashboard");
  return res.data;
};

export const getDailyChallenge = async () => {
  const res = await API.get("/challenge");
  return res.data;
};

// ===============================
// Practice
// ===============================

export const analyzeSpeech = async (transcript) => {
  const res = await API.post("/ai/analyze", {
    transcript,
  });

  return res.data;
};

export const savePractice = async (practiceData) => {
  const res = await API.post("/practice", practiceData);

  return res.data;
};

export const getPracticeHistory = async () => {
  const res = await API.get("/practice");

  return res.data;
};

export const downloadReport = async (id) => {
  const res = await API.get(`/report/${id}`, {
    responseType: "blob",
  });

  return res.data;
};

// ===============================
// Conversation
// ===============================

export const sendConversation = async (
  messages,
  mode
) => {
  const res = await API.post("/conversation", {
    messages,
    mode,
  });

  return res.data;
};

// ===============================
// Profile
// ===============================

export const getProfile = async () => {
  const res = await API.get("/profile");

  return res.data;
};

export const updateProfile = async (data) => {
  const res = await API.put("/profile", data);

  return res.data;
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const res = await API.post(
    "/upload/avatar",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return res.data;
};

// ===============================
// Settings
// ===============================

export const changePassword = async (data) => {
  const res = await API.put(
    "/settings/password",
    data
  );

  return res.data;
};

// ===============================
// Leaderboard
// ===============================

export const getLeaderboard = async () => {
  const res = await API.get("/leaderboard");

  return res.data;
};

export default API;