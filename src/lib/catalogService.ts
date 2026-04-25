import axios from "axios";
import { serverApi } from "./serverApi";

type ListOptions = {
  all?: boolean;
  page?: number;
  perPage?: number;
  limit?: number;
};

const HOME_PREVIEW_PARAMS = {
  per_page: 16,
  limit: 16,
};

const FULL_LIST_PARAMS = {
  per_page: 100,
  limit: 100,
};

function unwrap<T>(res: any, fallback: T): T {
  const payload = res?.data;

  if (!payload) {
    return fallback;
  }

  if (Array.isArray(payload.data)) {
    return payload.data as T;
  }

  if (Array.isArray(payload.data?.data)) {
    return payload.data.data as T;
  }

  if (payload.data !== undefined) {
    return payload.data as T;
  }

  return payload as T;
}

function normalizeList(value: any): any[] {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.data?.data)) return value.data.data;
  return [];
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

function getListParams(options?: ListOptions) {
  if (options?.all) {
    return {
      ...FULL_LIST_PARAMS,
      page: options.page ?? 1,
      ...(options.perPage ? { per_page: options.perPage } : {}),
      ...(options.limit ? { limit: options.limit } : {}),
    };
  }

  return {
    ...HOME_PREVIEW_PARAMS,
    page: options?.page ?? 1,
    ...(options?.perPage ? { per_page: options.perPage } : {}),
    ...(options?.limit ? { limit: options.limit } : {}),
  };
}

async function getFirstPage(path: string, options?: ListOptions) {
  const api = await serverApi();

  const res = await api.get(path, {
    params: getListParams(options),
  });

  return unwrap(res, []);
}

async function getAllPages(path: string, options?: ListOptions) {
  const api = await serverApi();

  const firstRes = await api.get(path, {
    params: getListParams({
      ...options,
      all: true,
      page: 1,
    }),
  });

  const firstPayload = firstRes.data;
  const firstItems = normalizeList(firstPayload);

  const lastPage = Number(firstPayload?.meta?.last_page ?? 1);

  if (!lastPage || lastPage <= 1) {
    return firstItems;
  }

  const restResults = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, index) => {
      const page = index + 2;

      return api.get(path, {
        params: getListParams({
          ...options,
          all: true,
          page,
        }),
      });
    }),
  );

  const restItems = restResults.flatMap((res) => normalizeList(res.data));

  return uniqueById([...firstItems, ...restItems]);
}

async function getList(path: string, options?: ListOptions) {
  if (options?.all) {
    return getAllPages(path, options);
  }

  return getFirstPage(path, options);
}

function filterProductsByCategory(products: any[], category: any, slug: string) {
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
  async getBanners(options?: ListOptions) {
    return getList("/catalog/banners", options);
  },

  async getProducts(options?: ListOptions) {
    return getList("/catalog/products", options);
  },

  async getProductBySlug(slug: string) {
    const api = await serverApi();

    const res = await api.get(`/catalog/products/${encodeURIComponent(slug)}`);

    return unwrap(res, null);
  },

  async getCategories(options?: ListOptions) {
    return getList("/catalog/categories", options);
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

      const categories = normalizeList(
        await catalogService.getCategories({ all: true }),
      );

      return categories.find((category) => category.slug === slug) ?? null;
    }
  },

  async getProductsByCategorySlug(slug: string, options?: ListOptions) {
    try {
      const products = await getList(
        `/catalog/categories/${encodeURIComponent(slug)}/products`,
        {
          ...options,
          all: options?.all ?? true,
        },
      );

      const productList = normalizeList(products);

      if (productList.length > 0) {
        return productList;
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

    const allProducts = normalizeList(
      await catalogService.getProducts({ all: true }),
    );

    return uniqueById(filterProductsByCategory(allProducts, category, slug));
  },

  async getCatalogGroups(options?: ListOptions) {
    return getList("/catalog/catalog-groups", options);
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

      const catalogGroups = normalizeList(
        await catalogService.getCatalogGroups({ all: true }),
      );

      return catalogGroups.find((group) => group.slug === slug) ?? null;
    }
  },

  async getCategoriesByCatalogGroupSlug(slug: string, options?: ListOptions) {
    try {
      const categories = await getList(
        `/catalog/catalog-groups/${encodeURIComponent(slug)}/categories`,
        {
          ...options,
          all: options?.all ?? true,
        },
      );

      const categoryList = normalizeList(categories);

      if (categoryList.length > 0) {
        return categoryList;
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

    const allCategories = normalizeList(
      await catalogService.getCategories({ all: true }),
    );

    const filteredCategories = filterCategoriesByCatalogGroup(
      allCategories,
      group,
      slug,
    );

    return uniqueById([...groupCategories, ...filteredCategories]);
  },

  async getProductsByCatalogGroupSlug(slug: string, options?: ListOptions) {
    try {
      const products = await getList(
        `/catalog/catalog-groups/${encodeURIComponent(slug)}/products`,
        {
          ...options,
          all: options?.all ?? true,
        },
      );

      const productList = normalizeList(products);

      if (productList.length > 0) {
        return productList;
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

    const categories = normalizeList(
      await catalogService.getCategoriesByCatalogGroupSlug(slug, {
        all: true,
      }),
    );

    const allProducts = normalizeList(
      await catalogService.getProducts({ all: true }),
    );

    return uniqueById(
      filterProductsByCatalogGroup(allProducts, group, categories, slug),
    );
  },

  async getStores(options?: ListOptions) {
    return getList("/catalog/stores", options);
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

      const stores = normalizeList(await catalogService.getStores({ all: true }));

      return stores.find((store) => store.slug === slug) ?? null;
    }
  },

  async getProductsByStoreSlug(slug: string, options?: ListOptions) {
    try {
      const products = await getList(
        `/catalog/stores/${encodeURIComponent(slug)}/products`,
        {
          ...options,
          all: options?.all ?? true,
        },
      );

      return normalizeList(products);
    } catch (error) {
      if (isNotFound(error)) {
        return [];
      }

      throw error;
    }
  },
};