"use client";

import { useCallback, useState } from "react";

import { sendResetPasswordEmail } from "@/lib/auth";

const SUCCESS_MESSAGE =
  "Link reset password sudah dikirim. Silakan cek inbox atau folder spam.";

export function useForgotPassword() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendResetLink = useCallback(async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    setError(null);
    setSuccess(null);

    if (!normalizedEmail) {
      setError("Email wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendResetPasswordEmail(normalizedEmail);
      setSuccess(SUCCESS_MESSAGE);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal mengirim email reset password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    success,
    error,
    isSubmitting,
    sendResetLink,
  };
}