"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { AuthRouteGuard } from "@/components/auth/AuthRouteGuard";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <AuthRouteGuard>{children}</AuthRouteGuard>
    </AuthProvider>
  );
}