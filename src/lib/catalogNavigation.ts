export function normalizeCatalogHref(raw?: string | null): string {
  if (!raw) return "#";

  let path = raw.trim();

  try {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      const url = new URL(path);
      path = `${url.pathname}${url.search || ""}`;
    }
  } catch {
    return "#";
  }

  path = path.replace(/^\/api\/v\d+/, "");
  path = path.replace(/^\/catalog\//, "/");

  const queryMatch = path.match(/[?&]slug=([^&]+)/);
  const slugFromQuery = queryMatch ? decodeURIComponent(queryMatch[1]) : null;

  if (path.startsWith("/products/")) {
    const slug = slugFromQuery || path.split("/").filter(Boolean).pop();
    return slug ? `/products/${slug}` : "#";
  }

  if (path.startsWith("/categories/")) {
    const slug = slugFromQuery || path.split("/").filter(Boolean).pop();
    return slug ? `/categories/${slug}` : "#";
  }

  if (path.startsWith("/catalog-groups/")) {
    const slug = slugFromQuery || path.split("/").filter(Boolean).pop();
    return slug ? `/catalog-groups/${slug}` : "#";
  }

  if (path.startsWith("/stores/")) {
    const slug = slugFromQuery || path.split("/").filter(Boolean).pop();
    return slug ? `/stores/${slug}` : "#";
  }

  if (
    path.startsWith("/products") ||
    path.startsWith("/categories") ||
    path.startsWith("/catalog-groups") ||
    path.startsWith("/stores")
  ) {
    return path;
  }

  return "#";
}