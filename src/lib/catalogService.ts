import { serverApi } from "./serverApi";

function unwrap<T>(res: any): T {
  return res?.data?.data ?? res?.data ?? [];
}

export const catalogService = {
  async getBanners() {
    const api = await serverApi();
    const res = await api.get("/catalog/banners");
    return unwrap(res);
  },

  async getProducts() {
    const api = await serverApi();
    const res = await api.get("/catalog/products");
    return unwrap(res);
  },

  async getProductBySlug(slug: string) {
    const api = await serverApi();
    const res = await api.get(`/catalog/products/${slug}`);
    return unwrap(res);
  },

  async getCategories() {
    const api = await serverApi();
    const res = await api.get("/catalog/categories");
    return unwrap(res);
  },

  async getCategoryBySlug(slug: string) {
    const api = await serverApi();
    const res = await api.get(`/catalog/categories/${slug}`);
    return unwrap(res);
  },

  async getProductsByCategorySlug(slug: string) {
    const api = await serverApi();
    const res = await api.get(`/catalog/categories/${slug}/products`);
    return unwrap(res);
  },

  async getCatalogGroups() {
    const api = await serverApi();
    const res = await api.get("/catalog/catalog-groups");
    return unwrap(res);
  },

  async getCatalogGroupBySlug(slug: string) {
    const api = await serverApi();
    const res = await api.get(`/catalog/catalog-groups/${slug}`);
    return unwrap(res);
  },

  async getProductsByCatalogGroupSlug(slug: string) {
    const api = await serverApi();
    const res = await api.get(`/catalog/catalog-groups/${slug}/products`);
    return unwrap(res);
  },

  async getStores() {
    const api = await serverApi();
    const res = await api.get("/catalog/stores");
    return unwrap(res);
  },

  async getStoreBySlug(slug: string) {
    const api = await serverApi();
    const res = await api.get(`/catalog/stores/${slug}`);
    return unwrap(res);
  },

  async getProductsByStoreSlug(slug: string) {
    const api = await serverApi();
    const res = await api.get(`/catalog/stores/${slug}/products`);
    return unwrap(res);
  },
};