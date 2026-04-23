import axios from "axios";
import { cookies } from "next/headers";

export const serverApi = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("api_token")?.value;

  return axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};