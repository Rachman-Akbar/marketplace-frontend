import type { StoreProduct } from "../types/storeProduct";

const FALLBACK_PRODUCT_IMAGE =
  "https://via.placeholder.com/600x600?text=No+Image";

export function resolveProductImage(product: StoreProduct) {
  const primaryImage = product.images?.find((image) => image.is_primary);

  return (
    product.thumbnail ||
    primaryImage?.image_url ||
    primaryImage?.url ||
    product.images?.[0]?.image_url ||
    product.images?.[0]?.url ||
    FALLBACK_PRODUCT_IMAGE
  );
}