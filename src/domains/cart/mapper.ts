import { API_ORIGIN } from "@/lib/axios";
import type { Cart } from "./types";

export type RawCartItem = {
  id: number;
  product_id: number;
  quantity: number;
  price?: number | string | null;
  subtotal?: number | string | null;
  product_name?: string | null;
  product_image?: string | null;
  product?: {
    id?: number;
    name?: string | null;
    price?: number | string | null;
    thumbnail?: string | null;
    image_url?: string | null;
    images?: Array<{
      id?: number;
      image_url?: string | null;
      is_primary?: boolean;
    }>;
  } | null;
};

export type RawCart = Omit<Cart, "items"> & {
  items?: RawCartItem[];
};

export function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^\d.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

function resolveImageUrl(image?: string | null): string | null {
  if (!image) return null;

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  const origin = API_ORIGIN.replace(/\/$/, "");
  const path = image.startsWith("/") ? image : `/${image}`;

  return `${origin}${path}`;
}

function getPrimaryProductImage(item: RawCartItem): string | null {
  return (
    item.product_image ??
    item.product?.thumbnail ??
    item.product?.image_url ??
    item.product?.images?.find((image) => image.is_primary)?.image_url ??
    item.product?.images?.[0]?.image_url ??
    null
  );
}

export function normalizeCart(rawCart?: RawCart | null): Cart {
  const rawItems = rawCart?.items ?? [];

  const items = rawItems.map((item) => {
    const price = toNumber(item.price ?? item.product?.price);
    const quantity = toNumber(item.quantity);
    const subtotal = toNumber(item.subtotal, price * quantity);

    return {
      id: item.id,
      product_id: item.product_id,
      product_name: item.product_name ?? item.product?.name ?? "Produk",
      product_image: resolveImageUrl(getPrimaryProductImage(item)),
      price,
      quantity,
      subtotal,
    };
  });

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.subtotal, 0);

  return {
    id: rawCart?.id,
    items,
    total_quantity: toNumber(rawCart?.total_quantity, totalQuantity),
    total_price: toNumber(rawCart?.total_price, totalPrice),
  };
}