export function toStoreRoute(slug: string): string {
  return `/stores/${encodeURIComponent(slug)}`;
}

export function toStoreProductsRoute(slug: string): string {
  return `/stores/${encodeURIComponent(slug)}/products`;
}

export const storeRoutes = {
  detail: toStoreRoute,
  products: toStoreProductsRoute,
} as const;