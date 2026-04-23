import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    Accept: "application/json",
  },
});

/**
 * AUTO ATTACH TOKEN
 */
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem("ukomp.auth.session");

    if (session) {
      const parsed = JSON.parse(session);
      config.headers.Authorization =
        `Bearer ${parsed.api_token}`;
    }
  }

  return config;
});