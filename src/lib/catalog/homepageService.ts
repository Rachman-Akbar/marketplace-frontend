import "server-only";

import { serverGet } from "@/lib/http/serverApi";

import type {
  Banner,
  CatalogGroup,
  Category,
  Product,
  Store,
} from "./types";

export type HomepageData = {
  banners: Banner[];
  products: Product[];
  categories: Category[];
  catalogGroups: CatalogGroup[];
  stores: Store[];
  hasPartialError: boolean;
};

type ApiListResponse<T> = T[] | {
  data?: T[];
};

function unwrapList<T>(response: ApiListResponse<T>): T[] {
  if (Array.isArray(response)) return response;
  return response.data ?? [];
}

async function safeGetList<T>(
  path: string,
  searchParams: Record<string, string | number | boolean> = {},
): Promise<{
  data: T[];
  failed: boolean;
}> {
  try {
    const response = await serverGet<ApiListResponse<T>>(path, {
      revalidate: 60,
      searchParams,
    });

    return {
      data: unwrapList(response),
      failed: false,
    };
  } catch (error) {
    console.warn(`Homepage request failed: ${path}`, error);

    return {
      data: [],
      failed: true,
    };
  }
}

export async function getHomepageData(): Promise<HomepageData> {
  const [
    bannersResult,
    productsResult,
    categoriesResult,
    catalogGroupsResult,
    storesResult,
  ] = await Promise.all([
    safeGetList<Banner>("/catalog/banners", {
      limit: 1,
      per_page: 1,
      is_active: true,
    }),

    safeGetList<Product>("/catalog/products", {
      limit: 6,
      per_page: 6,
      status: "active",
      include: "category,store,images",
    }),

    safeGetList<Category>("/catalog/categories", {
      limit: 8,
      per_page: 8,
    }),

    safeGetList<CatalogGroup>("/catalog/catalog-groups", {
      limit: 8,
      per_page: 8,
      include: "categories",
    }),

    safeGetList<Store>("/catalog/stores", {
      limit: 8,
      per_page: 8,
      is_active: true,
    }),
  ]);

  return {
    banners: bannersResult.data,
    products: productsResult.data,
    categories: categoriesResult.data,
    catalogGroups: catalogGroupsResult.data,
    stores: storesResult.data,
    hasPartialError: [
      bannersResult,
      productsResult,
      categoriesResult,
      catalogGroupsResult,
      storesResult,
    ].some((result) => result.failed),
  };
}