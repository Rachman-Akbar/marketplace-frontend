"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { getAxiosErrorMessage } from "@/lib/axios";
import {
  clearAuthSession,
  saveAuthSession,
} from "@/domains/auth/services/session";

import { registerWithFirebase } from "@/domains/auth/services/api";

type RegisterWithEmailInput = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  agreeTerms: boolean;
};

export function useRegisterWithPassword() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registerWithEmail = useCallback(
    async ({
      name,
      email,
      password,
      passwordConfirmation,
      agreeTerms,
    }: RegisterWithEmailInput) => {
      const normalizedName = name.trim();
      const normalizedEmail = email.trim().toLowerCase();

      setError(null);

      if (!agreeTerms) {
        setError("Anda harus menyetujui Terms of Service dan Privacy Policy.");
        return;
      }

      if (!normalizedName) {
        setError("Nama wajib diisi.");
        return;
      }

      if (!normalizedEmail) {
        setError("Email wajib diisi.");
        return;
      }

      if (password.length < 8) {
        setError("Password minimal 8 karakter.");
        return;
      }

      if (password !== passwordConfirmation) {
        setError("Konfirmasi password tidak sama.");
        return;
      }

      setIsSubmitting(true);

      try {
        const credential = await createUserWithEmailAndPassword(
          auth,
          normalizedEmail,
          password,
        );

        await updateProfile(credential.user, {
          displayName: normalizedName,
        });

        const idToken = await credential.user.getIdToken(true);

        const session = await registerWithFirebase({
          idToken,
          name: normalizedName,
        });

        saveAuthSession(session);

        router.replace("/");
        router.refresh();
      } catch (submitError) {
        clearAuthSession();

        try {
          await signOut(auth);
        } catch {
          // Abaikan. Tujuannya hanya memastikan state lokal bersih.
        }

        setError(getAxiosErrorMessage(submitError, "Register gagal."));
      } finally {
        setIsSubmitting(false);
      }
    },
    [router],
  );

  return {
    error,
    isSubmitting,
    registerWithEmail,
  };
}