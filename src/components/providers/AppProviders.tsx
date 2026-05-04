"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/domains/auth/context/AuthContext";
import { AuthRouteGuard } from "@/domains/auth/providers/AuthRouteGuard";
import { CartProvider } from "@/domains/cart/context/CartContext";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <AuthRouteGuard>{children}</AuthRouteGuard>
      </CartProvider>
    </AuthProvider>
  );
}