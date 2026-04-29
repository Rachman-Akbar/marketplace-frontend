"use client";

import { useGoogleAuth } from "@/domains/auth/hooks/useGoogleAuth";

type GoogleAuthButtonProps = {
  loadingText?: string;
  errorMessage?: string;
};

export function GoogleAuthButton({
  loadingText = "Processing...",
  errorMessage = "Google authentication gagal.",
}: GoogleAuthButtonProps) {
  const { error, isSubmitting, continueWithGoogle } = useGoogleAuth({
    errorMessage,
  });

  return (
    <div className="space-y-2">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        onClick={continueWithGoogle}
        disabled={isSubmitting}
      >
        <span className="text-base font-bold">G</span>
        {isSubmitting ? loadingText : "Google"}
      </button>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}