import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem("ukomp.auth.session");

    if (session) {
      try {
        const parsed = JSON.parse(session);

        if (parsed?.api_token) {
          config.headers.Authorization = `Bearer ${parsed.api_token}`;
        }
      } catch (error) {
        console.error("Failed parse session", error);
      }
    }
  }

  return config;
});

export default api;