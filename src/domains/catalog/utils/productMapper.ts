import { CATALOG_PLACEHOLDER_IMAGE } from "../constants";
import { toProductRoute } from "../services/catalogRoutes";

import type { Product, ProductCardItem } from "../types";

export function resolveProductImage(product: Product): string {
  return (
    product.thumbnail ||
    product.images?.find((image) => image.is_primary)?.image_url ||
    product.images?.[0]?.image_url ||
    CATALOG_PLACEHOLDER_IMAGE
  );
}

export function mapProductToCard(product: Product): ProductCardItem {
  return {
    id: product.id,
    title: product.name,
    image: resolveProductImage(product),
    price: Number(product.price),
    metaText: product.category?.name ?? product.store?.name ?? "",
    soldText:
      typeof product.stock === "number" ? `Stock ${product.stock}` : undefined,
    href: toProductRoute(product.slug),
  };
}