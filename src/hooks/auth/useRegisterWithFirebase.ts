"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "@/lib/firebase";
import { getAxiosErrorMessage } from "@/lib/axios";
import { registerWithFirebase, saveAuthSession } from "@/lib/auth";

export function useRegisterWithFirebase() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerWithGoogle = useCallback(async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken(true);

      const session = await registerWithFirebase({
        idToken,
        name: result.user.displayName ?? undefined,
      });

      saveAuthSession(session);

      router.replace("/");
      router.refresh();
    } catch (submitError) {
      setError(getAxiosErrorMessage(submitError, "Google register gagal."));
    } finally {
      setIsSubmitting(false);
    }
  }, [router]);

  return {
    error,
    isSubmitting,
    registerWithGoogle,
  };
}