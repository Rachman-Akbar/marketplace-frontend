"use client";

import { FormEvent } from "react";
import Link from "next/link";

import { useForgotPassword } from "@/hooks/auth/useForgotPassword";

import { AuthAlert } from "./AuthAlert";
import { AuthField } from "./AuthField";
import { AuthFormLayout } from "./AuthFormLayout";
import { Button } from "./Button";

export function ForgotPasswordForm() {
  const { error, success, isSubmitting, sendResetLink } =
    useForgotPassword();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    await sendResetLink(email);
  }

  return (
    <AuthFormLayout
      eyebrow="Account Recovery"
      title="Forgot Password?"
      description="Masukkan email akun kamu untuk menerima link reset password."
      footer={
        <>
          Remember your password?{" "}
          <Link href="/login" className="font-semibold text-emerald-700">
            Back to Login
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthField
          id="email"
          name="email"
          label="Email Address"
          placeholder="Email address"
          type="email"
          required
          autoComplete="email"
          disabled={isSubmitting}
        />

        <AuthAlert type="error" message={error} />
        <AuthAlert type="success" message={success} />

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </AuthFormLayout>
  );
}