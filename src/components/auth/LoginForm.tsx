"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuthSubmit } from "@/hooks/auth/useAuthSubmit";

import { AuthAlert } from "./AuthAlert";
import { AuthField } from "./AuthField";
import { AuthFormLayout } from "./AuthFormLayout";
import { Button } from "./Button";
import { SocialAuthSection } from "./SocialAuthSection";

export function LoginForm() {
  const { error, isSubmitting, submitAuth } = useAuthSubmit("Login gagal.");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();

    const password = String(formData.get("password") ?? "");

    await submitAuth(async () => {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      return credential.user;
    });
  }

  return (
    <AuthFormLayout
      eyebrow="Buyer Access"
      title="Welcome back"
      description="Sign in to continue your curated marketplace journey."
      footer={
        <>
          New here?{" "}
          <Link href="/register" className="font-semibold text-emerald-700">
            Create account
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

        <AuthField
          id="password"
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          required
          autoComplete="current-password"
          disabled={isSubmitting}
        />

        <AuthAlert type="error" message={error} />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-emerald-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <SocialAuthSection
        googleLoadingText="Signing in..."
        googleErrorMessage="Google login gagal."
      />
    </AuthFormLayout>
  );
}