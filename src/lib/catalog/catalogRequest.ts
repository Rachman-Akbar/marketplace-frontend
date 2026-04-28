import { api } from "@/lib/axios";

type ApiEnvelope<T> = {
  success?: boolean;
  message?: string | null;
  data?: T;
};

export async function getApiData<T>(url: string): Promise<T> {
  const response = await api.get<ApiEnvelope<T> | T>(url);
  const payload = response.data;

  if (
    payload !== null &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    "data" in payload
  ) {
    return (payload as ApiEnvelope<T>).data as T;
  }

  return payload as T;
}

export async function postApiData<TResponse, TPayload = unknown>(
  url: string,
  data?: TPayload
): Promise<TResponse> {
  const response = await api.post<ApiEnvelope<TResponse> | TResponse>(url, data);
  const payload = response.data;

  if (
    payload !== null &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    "data" in payload
  ) {
    return (payload as ApiEnvelope<TResponse>).data as TResponse;
  }

  return payload as TResponse;
}

export async function putApiData<TResponse, TPayload = unknown>(
  url: string,
  data?: TPayload
): Promise<TResponse> {
  const response = await api.put<ApiEnvelope<TResponse> | TResponse>(url, data);
  const payload = response.data;

  if (
    payload !== null &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    "data" in payload
  ) {
    return (payload as ApiEnvelope<TResponse>).data as TResponse;
  }

  return payload as TResponse;
}

export async function deleteApiData<TResponse = { message?: string }>(
  url: string
): Promise<TResponse> {
  const response = await api.delete<ApiEnvelope<TResponse> | TResponse>(url);
  const payload = response.data;

  if (
    payload !== null &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    "data" in payload
  ) {
    return (payload as ApiEnvelope<TResponse>).data as TResponse;
  }

  return payload as TResponse;
}