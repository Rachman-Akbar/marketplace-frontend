"use client";

import {
  API_TOKEN_COOKIE,
  AUTH_SESSION_CHANGED_EVENT,
  AUTH_STORAGE_KEY,
  COOKIE_MAX_AGE,
} from "../constants";

import type { AuthSession } from "../types";

function emitAuthSessionChanged() {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
}

function setCookie(name: string, value: string, maxAge: number) {
  if (typeof document === "undefined") return;

  document.cookie = [
    `${name}=${encodeURIComponent(value)}`,
    `Max-Age=${maxAge}`,
    "Path=/",
    "SameSite=Lax",
  ].join("; ");
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;

  document.cookie = [
    `${name}=`,
    "Max-Age=0",
    "Path=/",
    "SameSite=Lax",
  ].join("; ");
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AuthSession;

    if (!session?.api_token || !session?.user?.id) {
      clearAuthSession();
      return null;
    }

    return session;
  } catch {
    clearAuthSession();
    return null;
  }
}

export function saveAuthSession(session: AuthSession) {
  if (typeof window === "undefined") return;

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  setCookie(API_TOKEN_COOKIE, session.api_token, COOKIE_MAX_AGE);

  emitAuthSessionChanged();
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_STORAGE_KEY);
  sessionStorage.clear();
  deleteCookie(API_TOKEN_COOKIE);

  emitAuthSessionChanged();
}