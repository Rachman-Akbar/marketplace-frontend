export function toStoreRoute(slug: string) {
  return `/stores/${encodeURIComponent(slug)}`;
}

export function toStoreProductsRoute(slug: string) {
  return `/stores/${encodeURIComponent(slug)}/products`;
}