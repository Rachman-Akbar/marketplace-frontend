import "server-only";

import {
  catalogGet,
  isPaginatedResponse,
  type ApiListResponse,
  unwrapItem,
  unwrapList,
} from "./catalogApi";

import type { CatalogGroup, Category, Product } from "../types";

const CATALOG_GROUP_ENDPOINT = "/catalog/catalog-groups";
const CATEGORY_ENDPOINT = "/catalog/categories";
const PRODUCT_ENDPOINT = "/catalog/products";

export const catalogGroupService = {
  async getAllCatalogGroups(): Promise<CatalogGroup[]> {
    const firstResponse = await catalogGet<ApiListResponse<CatalogGroup>>(
      CATALOG_GROUP_ENDPOINT,
      {
        revalidate: 60,
        searchParams: {
          page: 1,
          per_page: 100,
          include: "categories",
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
        catalogGet<ApiListResponse<CatalogGroup>>(CATALOG_GROUP_ENDPOINT, {
          revalidate: 60,
          searchParams: {
            page,
            per_page: 100,
            include: "categories",
          },
        }),
      ),
    );

    return [
      ...firstItems,
      ...remainingResponses.flatMap((response) => unwrapList(response)),
    ];
  },

  async getCatalogGroupBySlug(slug: string): Promise<CatalogGroup | null> {
    const response = await catalogGet<CatalogGroup | { data?: CatalogGroup }>(
      `${CATALOG_GROUP_ENDPOINT}/${slug}`,
      {
        revalidate: 60,
        searchParams: {
          include: "categories",
        },
      },
    );

    return unwrapItem(response);
  },

  async getCategoriesByCatalogGroupSlug(slug: string): Promise<Category[]> {
    const response = await catalogGet<ApiListResponse<Category>>(
      CATEGORY_ENDPOINT,
      {
        revalidate: 60,
        searchParams: {
          catalog_group: slug,
          catalog_group_slug: slug,
          per_page: 100,
        },
      },
    );

    return unwrapList(response);
  },

  async getProductsByCatalogGroupSlug(slug: string): Promise<Product[]> {
    const response = await catalogGet<ApiListResponse<Product>>(
      PRODUCT_ENDPOINT,
      {
        revalidate: 60,
        searchParams: {
          catalog_group: slug,
          catalog_group_slug: slug,
          per_page: 100,
          include: "category,store,images",
        },
      },
    );

    return unwrapList(response);
  },
};