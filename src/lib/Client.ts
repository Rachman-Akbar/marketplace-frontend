import axios from "axios";

export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

clientApi.interceptors.request.use((config) => {
  const session = localStorage.getItem("auth_session");

  if (session) {
    const { api_token } = JSON.parse(session);

    if (api_token) {
      config.headers.Authorization = `Bearer ${api_token}`;
    }
  }

  return config;
});