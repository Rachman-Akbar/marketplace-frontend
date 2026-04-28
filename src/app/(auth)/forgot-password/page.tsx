"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button, Card, Input } from "@/components/auth";
import { sendResetPasswordEmail } from "@/lib/auth/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      await sendResetPasswordEmail(email);

      setSuccess(
        "Link reset password sudah dikirim. Silakan cek inbox atau folder spam."
      );
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal mengirim email reset password."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full space-y-6 rounded-2xl p-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
          Account Recovery
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Forgot Password?
        </h1>

        <p className="text-sm text-slate-500">
          Masukkan email akun kamu untuk menerima link reset password.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-slate-700"
            htmlFor="email"
          >
            Email Address
          </label>

          <Input
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </div>

        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        {success ? (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {success}
          </p>
        ) : null}

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold text-emerald-700">
          Back to Login
        </Link>
      </p>
    </Card>
  );
}