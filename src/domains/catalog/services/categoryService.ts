import "server-only";

import {
  catalogGet,
  type ApiListResponse,
  type PaginatedResponse,
  unwrapList,
} from "./catalogApi";

import type { Category, Product } from "../types";

const CATEGORY_ENDPOINT = "/catalog/categories";
const PRODUCT_ENDPOINT = "/catalog/products";

function isPaginatedResponse<T>(
  response: ApiListResponse<T>,
): response is PaginatedResponse<T> {
  return !Array.isArray(response) && typeof response === "object";
}

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    const firstResponse = await catalogGet<ApiListResponse<Category>>(
      CATEGORY_ENDPOINT,
      {
        revalidate: 60,
        searchParams: {
          page: 1,
          per_page: 100,
        },
      },
    );

    const firstItems = unwrapList(firstResponse);

    if (!isPaginatedResponse(firstResponse)) {
      return firstItems;
    }

    const lastPage = firstResponse.meta?.last_page ?? 1;

    if (lastPage <= 1) {
      return firstItems;
    }

    const remainingPages = Array.from(
      {
        length: lastPage - 1,
      },
      (_, index) => index + 2,
    );

    const remainingResponses = await Promise.all(
      remainingPages.map((page) =>
        catalogGet<ApiListResponse<Category>>(CATEGORY_ENDPOINT, {
          revalidate: 60,
          searchParams: {
            page,
            per_page: 100,
          },
        }),
      ),
    );

    return [
      ...firstItems,
      ...remainingResponses.flatMap((response) => unwrapList(response)),
    ];
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const response = await catalogGet<Category | { data?: Category }>(
      `${CATEGORY_ENDPOINT}/${slug}`,
      {
        revalidate: 60,
      },
    );

    if ("data" in response) {
      return response.data ?? null;
    }

    return response;
  },

  async getProductsByCategorySlug(slug: string): Promise<Product[]> {
    const response = await catalogGet<ApiListResponse<Product>>(
      PRODUCT_ENDPOINT,
      {
        revalidate: 60,
        searchParams: {
          category: slug,
          category_slug: slug,
          per_page: 100,
        },
      },
    );

    return unwrapList(response);
  },
};