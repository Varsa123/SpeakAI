import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const analyzeSpeech = async (transcript) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    "/ai/analyze",
    { transcript },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const getPracticeHistory = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/practice", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const getDashboard = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const savePractice = async (practiceData) => {
  const token = localStorage.getItem("token");

  const res = await API.post("/practice", practiceData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const sendConversation = async (messages, mode) => {
  const token = localStorage.getItem("token");

  const res = await API.post(
    "/conversation",
    {
      messages,
      mode,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await API.put("/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const changePassword = async (data) => {
  const token = localStorage.getItem("token");

  const res = await API.put("/settings/password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const downloadReport = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.get(`/report/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });

  return response.data;
};
export const uploadAvatar = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("avatar", file);

  const res = await API.post("/upload/avatar", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
export const getDailyChallenge = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/challenge", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const getLeaderboard = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/leaderboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export default API;