import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * AUTO ATTACH TOKEN
 */
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem("auth_session");

    if (session) {
      const { api_token } = JSON.parse(session);

      if (api_token) {
        config.headers.Authorization = `Bearer ${api_token}`;
      }
    }
  }

  return config;
});

export default api;