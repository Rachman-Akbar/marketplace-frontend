import "server-only";

import { API_BASE_URL } from "@/lib/http/config";

type CatalogRequestOptions = {
  searchParams?: Record<string, string | number | boolean | null | undefined>;
  revalidate?: number;
};

export type PaginatedResponse<T> = {
  data?: T[];
  meta?: {
    current_page?: number;
    last_page?: number;
  };
  links?: {
    next?: string | null;
  };
};

export type ApiListResponse<T> = T[] | PaginatedResponse<T>;

function buildCatalogUrl(
  path: string,
  searchParams?: CatalogRequestOptions["searchParams"],
): string {
  const url = new URL(`${API_BASE_URL}${path}`);

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

export function unwrapList<T>(response: ApiListResponse<T>): T[] {
  if (Array.isArray(response)) {
    return response;
  }

  return response.data ?? [];
}

export function unwrapItem<T>(response: T | { data?: T }): T | null {
  if (
    response &&
    typeof response === "object" &&
    "data" in response
  ) {
    return response.data ?? null;
  }

  return response as T;
}

export function isPaginatedResponse<T>(
  response: ApiListResponse<T>,
): response is PaginatedResponse<T> {
  return !Array.isArray(response) && typeof response === "object";
}

export async function catalogGet<T>(
  path: string,
  options: CatalogRequestOptions = {},
): Promise<T> {
  const response = await fetch(
    buildCatalogUrl(path, options.searchParams),
    {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: options.revalidate ?? 60,
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Catalog request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}