import "server-only";

import {
  catalogGet,
  isPaginatedResponse,
  type ApiListResponse,
  unwrapItem,
  unwrapList,
} from "./catalogApi";

import type { Product } from "../types";

const PRODUCT_ENDPOINT = "/catalog/products";

export type ProductPageResult = {
  products: Product[];
  currentPage: number;
  lastPage: number;
  hasMore: boolean;
};

export const productService = {
  async getProductsPage({
    page = 1,
    perPage = 8,
  }: {
    page?: number;
    perPage?: number;
  }): Promise<ProductPageResult> {
    const response = await catalogGet<ApiListResponse<Product>>(
      PRODUCT_ENDPOINT,
      {
        revalidate: 60,
        searchParams: {
          page,
          per_page: perPage,
          include: "category,store,images",
        },
      },
    );

    const products = unwrapList(response);

    const currentPage = !Array.isArray(response)
      ? response.meta?.current_page ?? page
      : page;

    const lastPage = !Array.isArray(response)
      ? response.meta?.last_page ?? page
      : page;

    return {
      products,
      currentPage,
      lastPage,
      hasMore: currentPage < lastPage,
    };
  },

  async getAllProducts(): Promise<Product[]> {
    const firstResponse = await catalogGet<ApiListResponse<Product>>(
      PRODUCT_ENDPOINT,
      {
        revalidate: 60,
        searchParams: {
          page: 1,
          per_page: 100,
          include: "category,store,images",
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
        catalogGet<ApiListResponse<Product>>(PRODUCT_ENDPOINT, {
          revalidate: 60,
          searchParams: {
            page,
            per_page: 100,
            include: "category,store,images",
          },
        }),
      ),
    );

    return [
      ...firstItems,
      ...remainingResponses.flatMap((response) => unwrapList(response)),
    ];
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const response = await catalogGet<Product | { data?: Product }>(
      `${PRODUCT_ENDPOINT}/${slug}`,
      {
        revalidate: 60,
        searchParams: {
          include: "category,store,images",
        },
      },
    );

    return unwrapItem(response);
  },
};