"use client";

import { FormEvent } from "react";
import Link from "next/link";

import { useRegisterWithPassword } from "@/domains/auth/hooks/useRegisterWithPassword";

import { AuthAlert } from "./AuthAlert";
import { AuthField } from "./AuthField";
import { AuthFormLayout } from "./AuthFormLayout";
import { Button } from "./Button";
import { SocialAuthSection } from "./SocialAuthSection";

export function RegisterForm() {
  const { error, isSubmitting, registerWithEmail } =
    useRegisterWithPassword();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await registerWithEmail({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      passwordConfirmation: String(
        formData.get("password_confirmation") ?? "",
      ),
      agreeTerms: formData.get("agree_terms") === "on",
    });
  }

  return (
    <AuthFormLayout
      eyebrow="Create Account"
      title="Join The Curated Canvas"
      description="Build your buyer profile and discover crafted essentials."
      footer={
        <>
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-emerald-700">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <AuthField
          id="name"
          name="name"
          label="Full Name"
          placeholder="Full name"
          required
          autoComplete="name"
          disabled={isSubmitting}
        />

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
          minLength={8}
          autoComplete="new-password"
          disabled={isSubmitting}
        />

        <AuthField
          id="password-confirmation"
          name="password_confirmation"
          label="Confirm Password"
          placeholder="Confirm password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          disabled={isSubmitting}
        />

        <label className="flex items-center gap-2 text-xs text-slate-500">
          <input
            name="agree_terms"
            type="checkbox"
            defaultChecked
            disabled={isSubmitting}
          />
          I agree with Terms of Service and Privacy Policy
        </label>

        <AuthAlert type="error" message={error} />

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <SocialAuthSection
        googleLoadingText="Creating..."
        googleErrorMessage="Google register gagal."
      />
    </AuthFormLayout>
  );
}