// src/lib/axios.ts


import axios from "axios";
import { AUTH_STORAGE_KEY } from "@/domains/auth/constants";

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

export const clientApi = api;

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
          error?: string;
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

    if (data?.error) {
      return data.error;
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

export function logApiError(label: string, error: unknown) {
  const logger =
    process.env.NODE_ENV === "development" ? console.warn : console.error;

  if (axios.isAxiosError(error)) {
    logger(label, {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      method: error.config?.method,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      fullUrl: `${error.config?.baseURL ?? ""}${error.config?.url ?? ""}`,
    });

    return;
  }

  if (error instanceof Error) {
    logger(label, {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return;
  }

  logger(label, error);
}

export default api;