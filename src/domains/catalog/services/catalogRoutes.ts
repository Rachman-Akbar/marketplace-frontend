export function toProductRoute(slug: string): string {
  return `/products/${slug}`;
}

export function toProductsRoute(): string {
  return "/products";
}

export function toCategoryRoute(slug: string): string {
  return `/categories/${slug}`;
}

export function toCategoryProductsRoute(slug: string): string {
  return `/categories/${slug}`;
}

export function toCatalogGroupRoute(slug: string): string {
  return `/catalog-groups/${slug}`;
}

export function toCatalogGroupProductsRoute(slug: string): string {
  return `/catalog-groups/${slug}`;
}

export function toStoreRoute(slug: string): string {
  return `/stores/${slug}`;
}

export function toBannerRoute(linkUrl?: string | null): string {
  return linkUrl || "/products";
}

export function toStoresRoute(): string {
  return "/stores";
}