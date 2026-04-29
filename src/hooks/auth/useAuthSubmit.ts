"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";

import { getAxiosErrorMessage } from "@/lib/axios";
import { syncFirebaseUserToBackend } from "@/lib/auth";

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