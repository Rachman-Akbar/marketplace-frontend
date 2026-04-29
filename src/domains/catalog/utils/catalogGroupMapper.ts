import { CATALOG_PLACEHOLDER_IMAGE } from "../constants";
import { toCatalogGroupProductsRoute } from "../services/catalogRoutes";

import type { CatalogGroup } from "../types";

export function resolveCatalogGroupImage(group: CatalogGroup): string {
  return (
    group.image_url ||
    group.cover_image_url ||
    CATALOG_PLACEHOLDER_IMAGE
  );
}

export function mapCatalogGroupToCard(group: CatalogGroup) {
  return {
    id: group.id,
    name: group.name,
    categoryCount: group.categories?.length ?? 0,
    href: toCatalogGroupProductsRoute(group.slug),
    imageUrl: resolveCatalogGroupImage(group),
    categories:
      group.categories?.map((category) => ({
        id: category.id,
        name: category.name,
      })) ?? [],
  };
}