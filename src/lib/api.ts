const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const DEFAULT_BASE_URLS = [
  "http://localhost/UKOMP/market-api/public/api",
  "http://127.0.0.1/UKOMP/market-api/public/api",
  "http://localhost:8000/api",
  "http://127.0.0.1:8000/api",
];

export type ApiEnvelope<T> = {
  data: T;
};

export async function fetchAPI<T>(endpoint: string): Promise<T> {
  const baseUrls = BASE_URL ? [BASE_URL] : DEFAULT_BASE_URLS;
  const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  let response: Response | null = null;
  let lastError: unknown;

  for (const baseUrl of baseUrls) {
    try {
      response = await fetch(`${baseUrl.replace(/\/$/, "")}${safeEndpoint}`, {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        break;
      }

      lastError = new Error(`Failed to fetch ${endpoint} (${response.status})`);
    } catch (error) {
      lastError = error;
    }
  }

  if (!response || !response.ok) {
    throw lastError instanceof Error ? lastError : new Error(`Failed to fetch ${endpoint}`);
  }

  const payload = (await response.json()) as ApiEnvelope<T> | T;

  if (typeof payload === "object" && payload !== null && "data" in payload) {
    return (payload as ApiEnvelope<T>).data;
  }

  return payload as T;
}
