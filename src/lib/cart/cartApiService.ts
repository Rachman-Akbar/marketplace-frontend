import { auth } from "@/lib/firebase";
import { api, API_ORIGIN, getAxiosErrorMessage } from "@/lib/axios";
import type {
  AddCartItemPayload,
  Cart,
  CartApiResponse,
  UpdateCartItemPayload,
} from "@/types/cart";

type RawCartItem = {
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

type RawCart = Omit<Cart, "items"> & {
  items: RawCartItem[];
};

function toNumber(value: unknown, fallback = 0): number {
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
  if (!image) {
    return null;
  }

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

function normalizeCart(cart: RawCart): Cart {
  const items = cart.items.map((item) => {
    const price = toNumber(item.price ?? item.product?.price);
    const quantity = toNumber(item.quantity);
    const subtotal = toNumber(item.subtotal, price * quantity);

    return {
      ...item,
      product_name: item.product_name ?? item.product?.name ?? "Produk",
      product_image: resolveImageUrl(getPrimaryProductImage(item)),
      price,
      quantity,
      subtotal,
    };
  });

  const totalQuantity = items.reduce((total, item) => {
    return total + toNumber(item.quantity);
  }, 0);

  const totalPrice = items.reduce((total, item) => {
    return total + toNumber(item.subtotal);
  }, 0);

  return {
    ...cart,
    items,
    total_quantity: toNumber(cart.total_quantity, totalQuantity),
    total_price: toNumber(cart.total_price, totalPrice),
  } as Cart;
}

async function getFirebaseToken(): Promise<string> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User belum login.");
  }

  return user.getIdToken();
}

function resolveCartResponse(response: CartApiResponse | Cart): Cart {
  const cart = "data" in response ? response.data : response;

  return normalizeCart(cart as RawCart);
}

async function cartRequest<T>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  url: string,
  data?: unknown,
): Promise<T> {
  const token = await getFirebaseToken();

  try {
    const response = await api.request<T>({
      url,
      method,
      data,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error, "Request cart gagal."));
  }
}

export async function getCart(): Promise<Cart> {
  const response = await cartRequest<CartApiResponse | Cart>("GET", "/carts");

  return resolveCartResponse(response);
}

export async function addCartItem(payload: AddCartItemPayload): Promise<Cart> {
  const response = await cartRequest<CartApiResponse | Cart>(
    "POST",
    "/carts/items",
    payload,
  );

  return resolveCartResponse(response);
}

export async function updateCartItem(
  productId: number,
  payload: UpdateCartItemPayload,
): Promise<Cart> {
  const response = await cartRequest<CartApiResponse | Cart>(
    "PATCH",
    `/carts/items/${productId}`,
    payload,
  );

  return resolveCartResponse(response);
}

export async function removeCartItem(productId: number): Promise<Cart> {
  const response = await cartRequest<CartApiResponse | Cart>(
    "DELETE",
    `/carts/items/${productId}`,
  );

  return resolveCartResponse(response);
}

export async function clearCart(): Promise<Cart> {
  const response = await cartRequest<CartApiResponse | Cart>(
    "DELETE",
    "/carts",
  );

  return resolveCartResponse(response);
}