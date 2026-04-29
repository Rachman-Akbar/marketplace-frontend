import "server-only";

import {
  catalogGet,
  isCatalogNotFoundError,
  isPaginatedResponse,
  type ApiListResponse,
  unwrapItem,
  unwrapList,
} from "./catalogApi";

import type { CatalogGroup, Category, Product } from "../types";

const CATALOG_GROUP_ENDPOINT = "/catalog/catalog-groups";
const CATEGORY_ENDPOINT = "/catalog/categories";
const PRODUCT_ENDPOINT = "/catalog/products";

async function getAllCatalogGroups(): Promise<CatalogGroup[]> {
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
    { length: lastPage - 1 },
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
}

async function getCatalogGroupBySlug(
  slug: string,
): Promise<CatalogGroup | null> {
  try {
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
  } catch (error) {
    if (!isCatalogNotFoundError(error)) {
      throw error;
    }
  }

  try {
    const response = await catalogGet<ApiListResponse<CatalogGroup>>(
      CATALOG_GROUP_ENDPOINT,
      {
        revalidate: 60,
        searchParams: {
          slug,
          per_page: 1,
          include: "categories",
        },
      },
    );

    const group = unwrapList(response).find(
      (item) => item.slug === slug,
    );

    if (group) {
      return group;
    }
  } catch (error) {
    if (!isCatalogNotFoundError(error)) {
      throw error;
    }
  }

  const groups = await getAllCatalogGroups();

  return groups.find((group) => group.slug === slug) ?? null;
}

async function getCategoriesByCatalogGroupSlug(
  slug: string,
): Promise<Category[]> {
  const group = await getCatalogGroupBySlug(slug);

  if (!group) {
    return [];
  }

  if (Array.isArray(group.categories) && group.categories.length > 0) {
    return group.categories;
  }

  const response = await catalogGet<ApiListResponse<Category>>(
    CATEGORY_ENDPOINT,
    {
      revalidate: 60,
      searchParams: {
        catalog_group_slug: slug,
        catalog_group: slug,
        catalog_group_id: group.id,
        per_page: 100,
      },
    },
  );

  const categories = unwrapList(response);

  return categories.filter((category) => {
    if (typeof category.catalog_group_id === "number") {
      return category.catalog_group_id === group.id;
    }

    return true;
  });
}

async function getProductsByCatalogGroupSlug(
  slug: string,
): Promise<Product[]> {
  const group = await getCatalogGroupBySlug(slug);

  if (!group) {
    return [];
  }

  const response = await catalogGet<ApiListResponse<Product>>(
    PRODUCT_ENDPOINT,
    {
      revalidate: 60,
      searchParams: {
        catalog_group_slug: slug,
        catalog_group: slug,
        catalog_group_id: group.id,
        per_page: 100,
        include: "category,store,images",
      },
    },
  );

  return unwrapList(response);
}

export const catalogGroupService = {
  getAllCatalogGroups,
  getCatalogGroupBySlug,
  getCategoriesByCatalogGroupSlug,
  getProductsByCatalogGroupSlug,
};