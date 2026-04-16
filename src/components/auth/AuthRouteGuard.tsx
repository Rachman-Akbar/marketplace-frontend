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
  return pathname === "/profile" || pathname.startsWith("/profile/");
}

export function AuthRouteGuard({ children }: AuthRouteGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { backendSession: session, isLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    const guestOnly = isGuestOnlyPath(pathname);
    const protectedRoute = isProtectedPath(pathname);

    if (!guestOnly && !protectedRoute) {
      setIsReady(true);
      return;
    }

    if (protectedRoute && !session) {
      router.replace("/login");
      return;
    }

    if (guestOnly && session) {
      router.replace("/");
      return;
    }

    setIsReady(true);
  }, [pathname, session, isLoading, router]);

  if (!isReady) {
    return <div>Loading...</div>; // Simple loader
  }

  return <>{children}</>;
}
