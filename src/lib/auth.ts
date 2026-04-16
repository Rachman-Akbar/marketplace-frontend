export type AuthUser = {
  id: string;
  firebase_uid: string | null;
  email: string;
  name: string | null;
  avatar: string | null;
  is_email_verified: boolean;
};

export type AuthResponse = {
  user: AuthUser;
  roles: string[];
  active_role: string;
  api_token: string;
};

export type AuthSession = AuthResponse;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const DEFAULT_BASE_URLS = [
  "http://localhost/UKOMP/market-api/public/api",
  "http://127.0.0.1/UKOMP/market-api/public/api",
  "http://localhost:8000/api",
  "http://127.0.0.1:8000/api",
];

const AUTH_STORAGE_KEY = "ukomp.auth.session";
export const AUTH_SESSION_CHANGED_EVENT = "ukomp:auth-session-changed";

function getBaseUrls(): string[] {
  return BASE_URL ? [BASE_URL] : DEFAULT_BASE_URLS;
}

function buildEndpoint(baseUrl: string, endpoint: string): string {
  const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  return `${baseUrl.replace(/\/$/, "")}${safeEndpoint}`;
}

async function postAuth<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const baseUrls = getBaseUrls();

  let lastError: unknown;

  for (const baseUrl of baseUrls) {
    try {
      const response = await fetch(buildEndpoint(baseUrl, endpoint), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const payload = await response.json().catch(() => ({}));

      if (response.ok) {
        return payload as T;
      }

      if (typeof payload?.message === "string") {
        lastError = new Error(payload.message);
      } else if (payload?.errors && typeof payload.errors === "object") {
        const firstError = Object.values(payload.errors)[0];
        if (Array.isArray(firstError) && typeof firstError[0] === "string") {
          lastError = new Error(firstError[0]);
        }
      }

      if (!lastError) {
        lastError = new Error(`Request failed (${response.status})`);
      }
    } catch (error) {
      if (error instanceof TypeError) {
        lastError = new Error(
          "Tidak bisa terhubung ke server API. Cek URL API dan konfigurasi CORS/backend.",
        );
      } else {
        lastError = error;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Auth request failed");
}

async function authRequest<T>(
  endpoint: string,
  init: RequestInit & { token?: string } = {},
): Promise<T> {
  const baseUrls = getBaseUrls();
  let lastError: unknown;

  for (const baseUrl of baseUrls) {
    try {
      const headers = new Headers(init.headers ?? {});
      headers.set("Accept", "application/json");

      if (init.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      if (init.token) {
        headers.set("Authorization", `Bearer ${init.token}`);
      }

      const response = await fetch(buildEndpoint(baseUrl, endpoint), {
        ...init,
        headers,
      });

      const payload = await response.json().catch(() => ({}));

      if (response.ok) {
        return payload as T;
      }

      if (typeof payload?.message === "string") {
        lastError = new Error(payload.message);
      } else {
        lastError = new Error(`Request failed (${response.status})`);
      }
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Auth request failed");
}

export async function registerWithPassword(input: {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}): Promise<AuthResponse> {
  return postAuth<AuthResponse>("/v1/identity/auth/register", {
    name: input.name,
    email: input.email,
    password: input.password,
    password_confirmation: input.passwordConfirmation,
  });
}

export async function loginWithPassword(input: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return postAuth<AuthResponse>("/v1/identity/auth/login", {
    email: input.email,
    password: input.password,
  });
}

export function saveAuthSession(session: AuthResponse): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawSession) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawSession) as AuthSession;
    if (!parsed?.api_token || !parsed?.user?.id) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
}

export async function verifyAuthSession(session: AuthSession): Promise<boolean> {
  try {
    await authRequest<{ user: AuthUser }>("/v1/identity/auth/me", {
      method: "GET",
      token: session.api_token,
    });

    return true;
  } catch {
    return false;
  }
}

export async function getVerifiedAuthSession(): Promise<AuthSession | null> {
  const session = getAuthSession();
  if (!session) {
    return null;
  }

  const isValid = await verifyAuthSession(session);
  if (!isValid) {
    clearAuthSession();

    return null;
  }

  return session;
}

export async function logoutWithToken(token: string): Promise<void> {
  await authRequest<{ message: string }>("/v1/identity/auth/logout", {
    method: "POST",
    token,
  });
}
