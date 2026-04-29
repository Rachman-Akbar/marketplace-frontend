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
  const url = new URL(`${API_BASE_URL}${path}`);

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
  const response = await fetch(buildUrl(path, options.searchParams), {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: options.revalidate ?? 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return data as T;
}