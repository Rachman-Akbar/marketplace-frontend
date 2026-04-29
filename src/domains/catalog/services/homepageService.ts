import "server-only";

import { catalogGet, type ApiListResponse, unwrapList } from "./catalogApi";
import { productService } from "./productService";

import type {
  Banner,
  CatalogGroup,
  Category,
  HomepageData,
  Store,
} from "../types";

async function safeGetList<T>(
  path: string,
  searchParams: Record<string, string | number | boolean> = {},
): Promise<{
  data: T[];
  failed: boolean;
}> {
  try {
    const response = await catalogGet<ApiListResponse<T>>(path, {
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
      per_page: 1,
    }),

    productService
      .getProductsPage({
        page: 1,
        perPage: 8,
      })
      .then((result) => ({
        data: result.products,
        failed: false,
      }))
      .catch((error) => {
        console.warn("Homepage products request failed:", error);

        return {
          data: [],
          failed: true,
        };
      }),

    safeGetList<Category>("/catalog/categories", {
      per_page: 8,
    }),

    safeGetList<CatalogGroup>("/catalog/catalog-groups", {
      per_page: 8,
      include: "categories",
    }),

    safeGetList<Store>("/catalog/stores", {
      per_page: 8,
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