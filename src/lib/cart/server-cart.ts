import "server-only";

import { cookies } from "next/headers";

import { API_TOKEN_COOKIE } from "@/domains/auth/constants";
import { API_BASE_URL } from "@/lib/http/config";

import type { CartSummary } from "./types";

type CartResponse =
  | {
      total_quantity?: number;
    }
  | {
      data?: {
        total_quantity?: number;
      };
    };

export async function getServerCartSummary(): Promise<CartSummary> {
  const cookieStore = await cookies();
  const apiToken = cookieStore.get(API_TOKEN_COOKIE)?.value;

  if (!apiToken) {
    return {
      total_quantity: 0,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
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

    const result = (await response.json()) as CartResponse;

    if ("data" in result) {
      return {
        total_quantity: result.data?.total_quantity ?? 0,
      };
    }

    return {
      total_quantity: result.total_quantity ?? 0,
    };
  } catch {
    return {
      total_quantity: 0,
    };
  }
}