import "server-only";

import {
  catalogGet,
  isPaginatedResponse,
  type ApiListResponse,
  unwrapList,
} from "./catalogApi";

import type { Category, Product } from "../types";

const CATEGORY_ENDPOINT = "/catalog/categories";
const PRODUCT_ENDPOINT = "/catalog/products";

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
      { length: lastPage - 1 },
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
    const categories = await this.getAllCategories();

    return categories.find((category) => category.slug === slug) ?? null;
  },

  async getProductsByCategorySlug(slug: string): Promise<Product[]> {
    const response = await catalogGet<ApiListResponse<Product>>(
      PRODUCT_ENDPOINT,
      {
        revalidate: 60,
        searchParams: {
          category_slug: slug,
          category: slug,
          per_page: 100,
          include: "category,store,images",
        },
      },
    );

    return unwrapList(response);
  },
};