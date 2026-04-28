// src/lib/axios.ts

import axios from "axios";
import { AUTH_STORAGE_KEY } from "@/lib/auth/auth-session";

export const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_ORIGIN ?? "http://localhost:8000";

export const API_BASE_URL = `${API_ORIGIN.replace(/\/$/, "")}/api/v1`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const session = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!session) {
    return config;
  }

  try {
    const parsed = JSON.parse(session) as {
      api_token?: string;
    };

    if (parsed.api_token) {
      config.headers.Authorization = `Bearer ${parsed.api_token}`;
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return config;
});

export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Terjadi kesalahan.",
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | {
          message?: string;
          errors?: Record<string, string[]>;
        }
      | undefined;

    if (data?.errors) {
      const firstError = Object.values(data.errors)[0]?.[0];

      if (firstError) {
        return firstError;
      }
    }

    if (data?.message) {
      return data.message;
    }

    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}