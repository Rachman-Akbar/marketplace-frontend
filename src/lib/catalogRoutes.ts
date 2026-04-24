export function toProductRoute(slug?: string | null) {
  return slug ? `/products/${encodeURIComponent(slug)}` : "/products";
}

export function toStoreRoute(slug?: string | null) {
  return slug ? `/stores/${encodeURIComponent(slug)}` : "/stores";
}

export function toCategoryProductsRoute(slug?: string | null) {
  return slug ? `/categories/${encodeURIComponent(slug)}` : "/categories";
}

export function toCatalogGroupProductsRoute(slug?: string | null) {
  return slug
    ? `/catalog-groups/${encodeURIComponent(slug)}`
    : "/catalog-groups";
}

export function toBannerRoute(raw?: string | null) {
  if (!raw) return "#";

  try {
    const value = raw.trim();

    if (value.startsWith("http://") || value.startsWith("https://")) {
      const url = new URL(value);
      return toBannerRoute(`${url.pathname}${url.search}`);
    }

    const path = value
      .replace(/^\/api\/v\d+/, "")
      .replace(/^\/catalog\//, "/");

    if (path.startsWith("/products/")) {
      const slug = path.split("/").filter(Boolean).pop();
      return toProductRoute(slug);
    }

    if (path.startsWith("/stores/")) {
      const slug = path.split("/").filter(Boolean).pop();
      return toStoreRoute(slug);
    }

    if (path.startsWith("/categories/")) {
      const slug = path.split("/").filter(Boolean).pop();
      return toCategoryProductsRoute(slug);
    }

    if (path.startsWith("/catalog-groups/")) {
      const slug = path.split("/").filter(Boolean).pop();
      return toCatalogGroupProductsRoute(slug);
    }

    if (path.startsWith("/products")) return path;
    if (path.startsWith("/stores")) return path;
    if (path.startsWith("/categories")) return path;
    if (path.startsWith("/catalog-groups")) return path;

    return "#";
  } catch {
    return "#";
  }
}