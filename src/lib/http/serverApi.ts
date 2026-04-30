import "server-only";

import { API_BASE_URL } from "./config";

type ServerGetOptions = {
  revalidate?: number;
  searchParams?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrl(
  path: string,
  searchParams?: ServerGetOptions["searchParams"],
): string {
  const normalizedBaseUrl = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const url = new URL(`${normalizedBaseUrl}${normalizedPath}`);

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

export async function serverGet<T>(
  path: string,
  options: ServerGetOptions = {},
): Promise<T> {
  const requestUrl = buildUrl(path, options.searchParams);

  console.log(`[serverGet request] ${requestUrl}`);

  const response = await fetch(requestUrl, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");

    const errorPayload = {
      requestUrl,
      responseUrl: response.url,
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    };

    console.error(`[serverGet error] ${JSON.stringify(errorPayload, null, 2)}`);

    throw new Error(
      `Request failed: ${response.status} ${response.statusText}. URL: ${requestUrl}. Body: ${errorText}`,
    );
  }

  return (await response.json()) as T;
}