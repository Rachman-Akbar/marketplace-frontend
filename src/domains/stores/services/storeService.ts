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

export const storeService = {
  async getStores(params: ListParams = {}): Promise<Store[]> {
    const response = await serverGet<ApiCollectionResponse<Store>>("/stores", {
      searchParams: params,
      revalidate: 60,
    });

    return normalizeCollection(response);
  },

  async getStoreBySlug(slug: string): Promise<Store | null> {
    const response = await serverGet<ApiItemResponse<Store>>(
      `/stores/${encodeURIComponent(slug)}`,
      {
        revalidate: 60,
      },
    );

    return normalizeItem(response);
  },

  async getProductsByStoreSlug(slug: string): Promise<StoreProduct[]> {
    const response = await serverGet<ApiCollectionResponse<StoreProduct>>(
      `/stores/${encodeURIComponent(slug)}/products`,
      {
        revalidate: 60,
      },
    );

    return normalizeCollection(response);
  },
};