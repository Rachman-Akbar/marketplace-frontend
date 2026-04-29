"use client";

import { useCallback } from "react";
import { signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "@/lib/firebase";
import { useAuthSubmit } from "./useAuthSubmit";

type UseGoogleAuthOptions = {
  errorMessage: string;
};

export function useGoogleAuth({ errorMessage }: UseGoogleAuthOptions) {
  const { error, isSubmitting, submitAuth } = useAuthSubmit(errorMessage);

  const continueWithGoogle = useCallback(async () => {
    await submitAuth(async () => {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    });
  }, [submitAuth]);

  return {
    error,
    isSubmitting,
    continueWithGoogle,
  };
}