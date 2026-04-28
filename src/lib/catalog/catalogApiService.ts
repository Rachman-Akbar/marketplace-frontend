import { api } from "../api";

export const catalogAPI = {
  products: () => api.get("/catalog/products"),
  categories: () => api.get("/catalog/categories"),
  banners: () => api.get("/catalog/banners"),
  groups: () => api.get("/catalog/catalog-groups"),
  stores: () => api.get("/catalog/stores"),
};