import axios from "axios";
import { auth } from "@/lib/firebase";
import type {
  AddCartItemPayload,
  Cart,
  CartApiResponse,
  UpdateCartItemPayload,
} from "@/types/cart";

const API_BASE_URL = "http://localhost:8000/api/v1";

async function getFirebaseToken(): Promise<string> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User belum login.");
  }

  return await user.getIdToken();
}

function resolveCartResponse(response: CartApiResponse | Cart): Cart {
  if ("data" in response) {
    return response.data;
  }

  return response;
}

async function cartRequest<T>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  url: string,
  data?: unknown
): Promise<T> {
  const token = await getFirebaseToken();

  try {
    const response = await axios.request<T>({
      baseURL: API_BASE_URL,
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
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ??
        error.response?.data?.error ??
        "Request cart gagal.";

      throw new Error(message);
    }

    throw error;
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
    payload
  );

  return resolveCartResponse(response);
}

export async function updateCartItem(
  productId: number,
  payload: UpdateCartItemPayload
): Promise<Cart> {
  const response = await cartRequest<CartApiResponse | Cart>(
    "PATCH",
    `/carts/items/${productId}`,
    payload
  );

  return resolveCartResponse(response);
}

export async function removeCartItem(productId: number): Promise<Cart> {
  const response = await cartRequest<CartApiResponse | Cart>(
    "DELETE",
    `/carts/items/${productId}`
  );

  return resolveCartResponse(response);
}

export async function clearCart(): Promise<Cart> {
  const response = await cartRequest<CartApiResponse | Cart>(
    "DELETE",
    "/carts"
  );

  return resolveCartResponse(response);
}