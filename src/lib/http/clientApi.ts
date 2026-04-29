import axios from "axios";

import { AUTH_STORAGE_KEY } from "@/domains/auth/constants";
import { API_BASE_URL } from "./config";

export const clientApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

clientApi.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const rawSession = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawSession) {
    return config;
  }

  try {
    const session = JSON.parse(rawSession) as {
      api_token?: string;
    };

    if (session.api_token) {
      config.headers.Authorization = `Bearer ${session.api_token}`;
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return config;
});

export const api = clientApi;

export default clientApi;