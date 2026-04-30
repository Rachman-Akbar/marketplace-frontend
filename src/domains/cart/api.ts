import { auth } from "@/lib/firebase";
import { api, getAxiosErrorMessage } from "@/lib/axios";
import { CART_ENDPOINTS } from "./constants";
import { normalizeCart, type RawCart } from "./mapper";
import type {
  AddCartItemPayload,
  Cart,
  CartApiResponse,
  UpdateCartItemPayload,
} from "./types";

type CartResponse = CartApiResponse | Cart | RawCart;

async function getFirebaseToken(): Promise<string> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User belum login.");
  }

  return user.getIdToken();
}

function resolveCartResponse(response: CartResponse): Cart {
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
  const response = await cartRequest<CartResponse>("GET", CART_ENDPOINTS.root);
  return resolveCartResponse(response);
}

export async function addCartItem(payload: AddCartItemPayload): Promise<Cart> {
  const response = await cartRequest<CartResponse>(
    "POST",
    CART_ENDPOINTS.items,
    payload,
  );

  return resolveCartResponse(response);
}

export async function updateCartItem(
  productId: number,
  payload: UpdateCartItemPayload,
): Promise<Cart> {
  const response = await cartRequest<CartResponse>(
    "PATCH",
    CART_ENDPOINTS.item(productId),
    payload,
  );

  return resolveCartResponse(response);
}

export async function removeCartItem(productId: number): Promise<Cart> {
  const response = await cartRequest<CartResponse>(
    "DELETE",
    CART_ENDPOINTS.item(productId),
  );

  return resolveCartResponse(response);
}

export async function clearCart(): Promise<Cart> {
  const response = await cartRequest<CartResponse>(
    "DELETE",
    CART_ENDPOINTS.root,
  );

  return resolveCartResponse(response);
}