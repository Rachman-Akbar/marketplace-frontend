"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { getAxiosErrorMessage } from "@/lib/axios";
import {
  clearAuthSession,
  syncFirebaseUserToBackend,
} from "@/domains/auth";

export function useAuthSubmit(defaultErrorMessage: string) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAuth = useCallback(
    async (getFirebaseUser: () => Promise<User>) => {
      setError(null);
      setIsSubmitting(true);

      try {
        const user = await getFirebaseUser();

        await syncFirebaseUserToBackend(user, {
          forceRefreshToken: true,
        });

        router.replace("/");
        router.refresh();
      } catch (submitError) {
        clearAuthSession();

        try {
          await signOut(auth);
        } catch {
          // Abaikan. Tujuannya hanya membersihkan state login lokal.
        }

        setError(getAxiosErrorMessage(submitError, defaultErrorMessage));
      } finally {
        setIsSubmitting(false);
      }
    },
    [defaultErrorMessage, router],
  );

  return {
    error,
    isSubmitting,
    submitAuth,
  };
}