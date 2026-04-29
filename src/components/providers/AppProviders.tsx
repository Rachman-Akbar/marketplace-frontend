"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/context/AuthContext";
import { AuthRouteGuard } from "@/components/auth/AuthRouteGuard";
import { CartProvider } from "@/context/CartContext";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <AuthRouteGuard>
        <CartProvider>{children}</CartProvider>
      </AuthRouteGuard>
    </AuthProvider>
  );
}