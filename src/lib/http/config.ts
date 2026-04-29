export const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_ORIGIN ?? "http://localhost:8000";

export const API_BASE_URL = `${API_ORIGIN.replace(/\/$/, "")}/api/v1`;