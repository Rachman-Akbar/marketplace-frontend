"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/domains/auth/context/AuthContext";

type AuthRouteGuardProps = {
  children: ReactNode;
};

const guestOnlyPaths = ["/login", "/register"];

const protectedPathPrefixes = [
  "/profile",
  "/cart",
  "/checkout",
  "/chat",
  "/notifications",
];

function isGuestOnlyPath(pathname: string): boolean {
  return guestOnlyPaths.includes(pathname);
}

function isProtectedPath(pathname: string): boolean {
  return protectedPathPrefixes.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

export function AuthRouteGuard({ children }: AuthRouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { firebaseUser, backendSession, isLoading } = useAuth();

  const guestOnly = isGuestOnlyPath(pathname);
  const protectedRoute = isProtectedPath(pathname);

  const isLoggedIn =
    !!firebaseUser &&
    !!backendSession &&
    backendSession.user.firebase_uid === firebaseUser.uid;

  useEffect(() => {
    if (isLoading) return;

    if (protectedRoute && !isLoggedIn) {
      router.replace("/login");
      return;
    }

    if (guestOnly && isLoggedIn) {
      router.replace("/");
    }
  }, [guestOnly, protectedRoute, isLoggedIn, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Loading...
      </div>
    );
  }

  if (protectedRoute && !isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Redirecting...
      </div>
    );
  }

  if (guestOnly && isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Redirecting...
      </div>
    );
  }

  return <>{children}</>;
}