import { toProductRoute } from "@/lib/catalog/catalogRoutes";

import type { Product } from "./types";

export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export function resolveProductImage(product: Product): string {
  return (
    product.thumbnail ??
    product.images?.find((image) => image.is_primary)?.image_url ??
    product.images?.[0]?.image_url ??
    PLACEHOLDER_IMAGE
  );
}

export function mapRecommendedProducts(products: Product[]) {
  return products.map((product) => ({
    id: product.id,
    title: product.name,
    image: resolveProductImage(product),
    price: product.price,
    metaText: product.category?.name ?? product.store?.name ?? "",
    soldText:
      typeof product.stock === "number" ? `Stock ${product.stock}` : undefined,
    href: toProductRoute(product.slug),
  }));
}