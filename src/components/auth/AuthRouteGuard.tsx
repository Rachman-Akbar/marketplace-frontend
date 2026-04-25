"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type AuthRouteGuardProps = {
  children: ReactNode;
};

function isGuestOnlyPath(pathname: string): boolean {
  return pathname === "/login" || pathname === "/register";
}

function isProtectedPath(pathname: string): boolean {
  return (
    pathname === "/profile" ||
    pathname.startsWith("/profile/") ||
    pathname === "/cart" ||
    pathname.startsWith("/checkout") ||
    pathname === "/chat" ||
    pathname.startsWith("/chat/") ||
    pathname === "/notifications" ||
    pathname.startsWith("/notifications/")
  );
}

export function AuthRouteGuard({ children }: AuthRouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { backendSession, isLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsReady(false);
      return;
    }

    const guestOnly = isGuestOnlyPath(pathname);
    const protectedRoute = isProtectedPath(pathname);

    if (protectedRoute && !backendSession) {
      setIsReady(false);
      router.replace("/login");
      return;
    }

    if (guestOnly && backendSession) {
      setIsReady(false);
      router.replace("/");
      return;
    }

    setIsReady(true);
  }, [pathname, backendSession, isLoading, router]);

  if (isLoading || !isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}