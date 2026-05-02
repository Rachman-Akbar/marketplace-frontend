import "server-only";

import { cookies } from "next/headers";

import { API_BASE_URL } from "@/lib/http/config";
import { API_TOKEN_COOKIE } from "@/domains/auth/constants";

import type { AuthResponse, AuthSession, AuthUser } from "@/domains/auth";

type MeResponse =
  | AuthResponse
  | {
      user?: AuthUser;
      roles?: string[];
      active_role?: string;
    };

function normalizeAuthSession(
  response: MeResponse,
  apiToken: string,
): AuthSession | null {
  if ("user" in response && response.user?.id) {
    return {
      user: response.user,
      roles: response.roles ?? [],
      active_role: response.active_role ?? "",
      api_token:
        "api_token" in response && response.api_token
          ? response.api_token
          : apiToken,
    };
  }

  return null;
}

export async function getServerAuthSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const apiToken = cookieStore.get(API_TOKEN_COOKIE)?.value;

  if (!apiToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/identity/auth/me`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as MeResponse;

    return normalizeAuthSession(data, apiToken);
  } catch {
    return null;
  }
}