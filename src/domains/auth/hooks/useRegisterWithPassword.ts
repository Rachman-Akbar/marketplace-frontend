"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { getAxiosErrorMessage } from "@/lib/axios";
import { registerWithPassword, saveAuthSession } from "@/domains/auth";

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
        const session = await registerWithPassword({
          name: normalizedName,
          email: normalizedEmail,
          password,
          passwordConfirmation,
        });

        await signInWithEmailAndPassword(auth, normalizedEmail, password);

        saveAuthSession(session);

        router.replace("/");
        router.refresh();
      } catch (submitError) {
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