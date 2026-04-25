import axios from "axios";
import { serverApi } from "./serverApi";

const FULL_LIST_PARAMS = {
  per_page: 100,
  limit: 100,
};

function unwrap<T>(res: any, fallback: T): T {
  const payload = res?.data;

  if (!payload) {
    return fallback;
  }

  if (payload.data !== undefined) {
    return payload.data as T;
  }

  return payload as T;
}

function normalizeList<T = any>(value: any): T[] {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) return value.data;

  if (Array.isArray(value?.data?.data)) return value.data.data;

  return [];
}

function getLastPage(payload: any): number {
  return Number(
    payload?.meta?.last_page ??
      payload?.data?.meta?.last_page ??
      1,
  );
}

function isNotFound(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 404;
}

function uniqueById<T extends { id?: number | string }>(items: T[]): T[] {
  const map = new Map<number | string, T>();

  for (const item of items) {
    if (item?.id !== undefined && item?.id !== null) {
      map.set(item.id, item);
    }
  }

  return Array.from(map.values());
}

async function getAllPages<T = any>(
  path: string,
  params: Record<string, any> = {},
): Promise<T[]> {
  const api = await serverApi();

  const firstRes = await api.get(path, {
    params: {
      ...FULL_LIST_PARAMS,
      ...params,
      page: 1,
    },
  });

  const firstPayload = firstRes.data;
  const firstItems = normalizeList<T>(firstPayload);
  const lastPage = getLastPage(firstPayload);

  if (!lastPage || lastPage <= 1) {
    return firstItems;
  }

  const restResults = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) => {
      const page = index + 2;

      return api.get(path, {
        params: {
          ...FULL_LIST_PARAMS,
          ...params,
          page,
        },
      });
    }),
  );

  const restItems = restResults.flatMap((res) =>
    normalizeList<T>(res.data),
  );

  return uniqueById([...firstItems, ...restItems]);
}

function filterProductsByCategory(
  products: any[],
  category: any,
  slug: string,
) {
  return products.filter((product) => {
    return (
      product?.category?.slug === slug ||
      product?.category_slug === slug ||
      product?.category_id === category?.id ||
      product?.category?.id === category?.id
    );
  });
}

function filterCategoriesByCatalogGroup(
  categories: any[],
  group: any,
  slug: string,
) {
  return categories.filter((category) => {
    return (
      category?.catalog_group_id === group?.id ||
      category?.catalogGroupId === group?.id ||
      category?.catalog_group?.id === group?.id ||
      category?.catalog_group?.slug === slug ||
      category?.catalogGroup?.id === group?.id ||
      category?.catalogGroup?.slug === slug
    );
  });
}

function filterProductsByCatalogGroup(
  products: any[],
  group: any,
  categories: any[],
  slug: string,
) {
  const categoryIds = new Set(
    categories.map((category) => category?.id).filter(Boolean),
  );

  const categorySlugs = new Set(
    categories.map((category) => category?.slug).filter(Boolean),
  );

  return products.filter((product) => {
    return (
      product?.catalog_group_id === group?.id ||
      product?.catalog_group?.id === group?.id ||
      product?.catalog_group?.slug === slug ||
      product?.catalogGroup?.id === group?.id ||
      product?.catalogGroup?.slug === slug ||
      product?.category?.catalog_group_id === group?.id ||
      product?.category?.catalog_group?.id === group?.id ||
      product?.category?.catalog_group?.slug === slug ||
      product?.category?.catalogGroup?.id === group?.id ||
      product?.category?.catalogGroup?.slug === slug ||
      categoryIds.has(product?.category_id) ||
      categoryIds.has(product?.category?.id) ||
      categorySlugs.has(product?.category?.slug)
    );
  });
}

export const catalogService = {
  async getBanners() {
    return getAllPages("/catalog/banners");
  },

  async getProducts() {
    return getAllPages("/catalog/products");
  },

  async getProductBySlug(slug: string) {
    const api = await serverApi();

    const res = await api.get(`/catalog/products/${encodeURIComponent(slug)}`);

    return unwrap(res, null);
  },

  async getCategories() {
    return getAllPages("/catalog/categories");
  },

  async getCategoryBySlug(slug: string) {
    const api = await serverApi();

    try {
      const res = await api.get(
        `/catalog/categories/${encodeURIComponent(slug)}`,
      );

      return unwrap(res, null);
    } catch (error) {
      if (!isNotFound(error)) {
        throw error;
      }

      const categories = await catalogService.getCategories();

      return categories.find((category: any) => category.slug === slug) ?? null;
    }
  },

  async getProductsByCategorySlug(slug: string) {
    try {
      const directProducts = await getAllPages(
        `/catalog/categories/${encodeURIComponent(slug)}/products`,
      );

      if (directProducts.length > 0) {
        return directProducts;
      }
    } catch (error) {
      if (!isNotFound(error)) {
        throw error;
      }
    }

    const category = await catalogService.getCategoryBySlug(slug);

    if (!category) {
      return [];
    }

    const allProducts = await catalogService.getProducts();

    return uniqueById(
      filterProductsByCategory(allProducts, category, slug),
    );
  },

  async getCatalogGroups() {
    return getAllPages("/catalog/catalog-groups");
  },

  async getCatalogGroupBySlug(slug: string) {
    const api = await serverApi();

    try {
      const res = await api.get(
        `/catalog/catalog-groups/${encodeURIComponent(slug)}`,
      );

      return unwrap(res, null);
    } catch (error) {
      if (!isNotFound(error)) {
        throw error;
      }

      const catalogGroups = await catalogService.getCatalogGroups();

      return catalogGroups.find((group: any) => group.slug === slug) ?? null;
    }
  },

  async getCategoriesByCatalogGroupSlug(slug: string) {
    try {
      const directCategories = await getAllPages(
        `/catalog/catalog-groups/${encodeURIComponent(slug)}/categories`,
      );

      if (directCategories.length > 0) {
        return directCategories;
      }
    } catch (error) {
      if (!isNotFound(error)) {
        throw error;
      }
    }

    const group = await catalogService.getCatalogGroupBySlug(slug);

    if (!group) {
      return [];
    }

    const groupCategories = normalizeList(group.categories);
    const allCategories = await catalogService.getCategories();

    const filteredCategories = filterCategoriesByCatalogGroup(
      allCategories,
      group,
      slug,
    );

    return uniqueById([...groupCategories, ...filteredCategories]);
  },

  async getProductsByCatalogGroupSlug(slug: string) {
    try {
      const directProducts = await getAllPages(
        `/catalog/catalog-groups/${encodeURIComponent(slug)}/products`,
      );

      if (directProducts.length > 0) {
        return directProducts;
      }
    } catch (error) {
      if (!isNotFound(error)) {
        throw error;
      }
    }

    const group = await catalogService.getCatalogGroupBySlug(slug);

    if (!group) {
      return [];
    }

    const categories = await catalogService.getCategoriesByCatalogGroupSlug(slug);
    const allProducts = await catalogService.getProducts();

    return uniqueById(
      filterProductsByCatalogGroup(allProducts, group, categories, slug),
    );
  },

  async getStores() {
    return getAllPages("/catalog/stores");
  },

  async getStoreBySlug(slug: string) {
    const api = await serverApi();

    try {
      const res = await api.get(`/catalog/stores/${encodeURIComponent(slug)}`);

      return unwrap(res, null);
    } catch (error) {
      if (!isNotFound(error)) {
        throw error;
      }

      const stores = await catalogService.getStores();

      return stores.find((store: any) => store.slug === slug) ?? null;
    }
  },

  async getProductsByStoreSlug(slug: string) {
    try {
      return await getAllPages(
        `/catalog/stores/${encodeURIComponent(slug)}/products`,
      );
    } catch (error) {
      if (isNotFound(error)) {
        return [];
      }

      throw error;
    }
  },
};