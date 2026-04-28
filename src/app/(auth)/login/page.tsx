"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import {
  loginWithFirebaseAction,
  saveAuthSession,
} from "@/lib/auth/auth";
import { getAxiosErrorMessage } from "@/lib/axios";
import { Button, Card, Input } from "@/components/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const credential = await signInWithEmailAndPassword(
        auth,
        normalizedEmail,
        password,
      );

      const idToken = await credential.user.getIdToken();

      const session = await loginWithFirebaseAction({
        idToken,
      });

      saveAuthSession(session);

      router.replace("/");
      router.refresh();
    } catch (submitError) {
      setError(getAxiosErrorMessage(submitError, "Login gagal."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full space-y-6 rounded-2xl p-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
          Buyer Access
        </p>

        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Welcome back
        </h1>

        <p className="text-sm text-slate-500">
          Sign in to continue your curated marketplace journey.
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
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <label
            className="block text-sm font-semibold text-slate-700"
            htmlFor="password"
          >
            Password
          </label>

          <Input
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

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

      <div className="relative py-1">
        <div className="h-px bg-slate-200" />

        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GoogleLoginButton />

        <button
          className="rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-400"
          type="button"
          disabled
        >
          Apple
        </button>
      </div>

      <p className="text-center text-sm text-slate-500">
        New here?{" "}
        <Link href="/register" className="font-semibold text-emerald-700">
          Create account
        </Link>
      </p>
    </Card>
  );
}

function GoogleLoginButton() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleGoogleLogin() {
    setError(null);
    setIsSubmitting(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken(true);

      const session = await loginWithFirebaseAction({
        idToken,
      });

      saveAuthSession(session);

      router.replace("/");
      router.refresh();
    } catch (submitError) {
      setError(getAxiosErrorMessage(submitError, "Google login gagal."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        onClick={handleGoogleLogin}
        disabled={isSubmitting}
      >
        <span className="text-base font-bold">G</span>
        {isSubmitting ? "Signing in..." : "Google"}
      </button>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </div>
  );
}