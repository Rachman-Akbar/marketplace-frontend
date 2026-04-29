import { CATALOG_PLACEHOLDER_IMAGE } from "../constants";
import { toCategoryProductsRoute } from "../services/catalogRoutes";

import type { Category } from "../types";

export function resolveCategoryImage(category: Category): string {
  return (
    category.image_url ||
    category.cover_image_url ||
    CATALOG_PLACEHOLDER_IMAGE
  );
}

export function mapCategoryToCard(category: Category) {
  return {
    id: category.id,
    name: category.name,
    itemCount: category.products_count ?? 0,
    imageUrl: resolveCategoryImage(category),
    href: toCategoryProductsRoute(category.slug),
  };
}