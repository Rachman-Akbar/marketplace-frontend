import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
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
      try {
        const { api_token } = JSON.parse(session);

        if (api_token) {
          config.headers.Authorization = `Bearer ${api_token}`;
        }
      } catch {}
    }
  }

  return config;
});

export default api;