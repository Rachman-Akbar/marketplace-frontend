import "server-only";

import { cookies } from "next/headers";

import { API_BASE_URL } from "@/lib/http/config";
import { API_TOKEN_COOKIE } from "@/domains/auth/constants";
import { CART_ENDPOINTS } from "@/domains/cart/constants";
import { normalizeCart, type RawCart } from "@/domains/cart/mapper";

import type { CartApiResponse, CartSummary } from "@/domains/cart/types";

type CartResponse = CartApiResponse | RawCart;

function resolveCartSummary(response: CartResponse): CartSummary {
  const cart = "data" in response ? response.data : response;
  const normalizedCart = normalizeCart(cart as RawCart);

  return {
    total_quantity: normalizedCart.total_quantity,
  };
}

export async function getServerCartSummary(): Promise<CartSummary> {
  const cookieStore = await cookies();
  const apiToken = cookieStore.get(API_TOKEN_COOKIE)?.value;

  if (!apiToken) {
    return {
      total_quantity: 0,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}${CART_ENDPOINTS.root}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        total_quantity: 0,
      };
    }

    const data = (await response.json()) as CartResponse;

    return resolveCartSummary(data);
  } catch {
    return {
      total_quantity: 0,
    };
  }
}