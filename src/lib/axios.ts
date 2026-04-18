import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
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