import "server-only";

import { serverGet } from "@/lib/http/serverApi";

import type { Store } from "../types/store";
import type { StoreProduct } from "../types/storeProduct";

type ListParams = {
  page?: number;
  per_page?: number;
  search?: string;
  all?: boolean;
};

type ApiCollectionResponse<T> =
  | T[]
  | {
      data?: T[];
      meta?: unknown;
      links?: unknown;
    };

type ApiItemResponse<T> =
  | T
  | {
      data?: T | null;
    }
  | null;

function normalizeCollection<T>(payload: ApiCollectionResponse<T>): T[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  return [];
}

function normalizeItem<T>(payload: ApiItemResponse<T>): T | null {
  if (!payload || Array.isArray(payload)) {
    return null;
  }

  if (
    typeof payload === "object" &&
    "data" in payload &&
    payload.data !== undefined
  ) {
    return payload.data ?? null;
  }

  return payload as T;
}

function toSearchParams(params: ListParams): Record<string, string> {
  const searchParams: Record<string, string> = {};

  if (typeof params.page === "number" && params.page > 0) {
    searchParams.page = String(params.page);
  }

  if (typeof params.per_page === "number" && params.per_page > 0) {
    searchParams.per_page = String(params.per_page);
  }

  if (typeof params.search === "string" && params.search.trim()) {
    searchParams.search = params.search.trim();
  }

  if (typeof params.all === "boolean") {
    searchParams.all = params.all ? "1" : "0";
  }

  return searchParams;
}

export const storeService = {
  async getStores(params: ListParams = {}): Promise<Store[]> {
    const response = await serverGet<ApiCollectionResponse<Store>>("/stores", {
      searchParams: toSearchParams(params),
      revalidate: 60,
    });

    return normalizeCollection(response);
  },

  async getStoreBySlug(slug: string): Promise<Store | null> {
    if (!slug.trim()) {
      return null;
    }

    const response = await serverGet<ApiItemResponse<Store>>(
      `/stores/${encodeURIComponent(slug)}`,
      {
        revalidate: 60,
      },
    );

    return normalizeItem(response);
  },

  async getProductsByStoreSlug(slug: string): Promise<StoreProduct[]> {
    if (!slug.trim()) {
      return [];
    }

    const response = await serverGet<ApiCollectionResponse<StoreProduct>>(
      `/stores/${encodeURIComponent(slug)}/products`,
      {
        revalidate: 60,
      },
    );

    return normalizeCollection(response);
  },
};