import axios from "axios";
import { serverApi } from "./serverApi";

function unwrap<T>(res: any, fallback: T): T {
  return res?.data?.data ?? res?.data ?? fallback;
}

function isNotFound(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 404;
}

export const catalogService = {
  async getBanners() {
    const api = await serverApi();
    const res = await api.get("/catalog/banners");
    return unwrap(res, []);
  },

  async getProducts() {
    const api = await serverApi();
    const res = await api.get("/catalog/products");
    return unwrap(res, []);
  },

  async getProductBySlug(slug: string) {
    const api = await serverApi();
    const res = await api.get(`/catalog/products/${encodeURIComponent(slug)}`);
    return unwrap(res, null);
  },

  async getCategories() {
    const api = await serverApi();
    const res = await api.get("/catalog/categories");
    return unwrap(res, []);
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

      const res = await api.get("/catalog/categories");
      const categories = unwrap<any[]>(res, []);

      return categories.find((category) => category.slug === slug) ?? null;
    }
  },

  async getProductsByCategorySlug(slug: string) {
    const api = await serverApi();

    try {
      const res = await api.get(
        `/catalog/categories/${encodeURIComponent(slug)}/products`,
      );

      return unwrap(res, []);
    } catch (error) {
      if (isNotFound(error)) {
        return [];
      }

      throw error;
    }
  },

  async getCatalogGroups() {
    const api = await serverApi();
    const res = await api.get("/catalog/catalog-groups");
    return unwrap(res, []);
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

      const res = await api.get("/catalog/catalog-groups");
      const catalogGroups = unwrap<any[]>(res, []);

      return catalogGroups.find((group) => group.slug === slug) ?? null;
    }
  },

  async getProductsByCatalogGroupSlug(slug: string) {
    const api = await serverApi();

    try {
      const res = await api.get(
        `/catalog/catalog-groups/${encodeURIComponent(slug)}/products`,
      );

      return unwrap(res, []);
    } catch (error) {
      if (isNotFound(error)) {
        return [];
      }

      throw error;
    }
  },

  async getStores() {
    const api = await serverApi();
    const res = await api.get("/catalog/stores");
    return unwrap(res, []);
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

      const res = await api.get("/catalog/stores");
      const stores = unwrap<any[]>(res, []);

      return stores.find((store) => store.slug === slug) ?? null;
    }
  },

  async getProductsByStoreSlug(slug: string) {
    const api = await serverApi();

    try {
      const res = await api.get(
        `/catalog/stores/${encodeURIComponent(slug)}/products`,
      );

      return unwrap(res, []);
    } catch (error) {
      if (isNotFound(error)) {
        return [];
      }

      throw error;
    }
  },
};