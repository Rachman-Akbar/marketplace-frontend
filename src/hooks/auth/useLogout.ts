"use client";

import { useCallback, useState } from "react";

import { logout } from "@/lib/auth";

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  }, [isLoggingOut]);

  return {
    isLoggingOut,
    handleLogout,
  };
}