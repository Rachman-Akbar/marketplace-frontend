// src/lib/serverApi.ts

import axios from "axios";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/axios";

export const serverApi = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("api_token")?.value;

  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};