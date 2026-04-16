"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getVerifiedAuthSession } from "@/lib/auth";

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
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function runGuard() {
      const guestOnly = isGuestOnlyPath(pathname);
      const protectedRoute = isProtectedPath(pathname);

      if (!guestOnly && !protectedRoute) {
        if (mounted) {
          setIsReady(true);
        }

        return;
      }

      if (mounted) {
        setIsReady(false);
      }

      const session = await getVerifiedAuthSession();

      if (!mounted) {
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
    }

    runGuard();

    return () => {
      mounted = false;
    };
  }, [pathname, router]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
