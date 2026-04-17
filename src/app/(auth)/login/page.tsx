"use client";

import { FormEvent, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { firebaseAuthService } from "@/lib/firebaseAuthService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { loginWithPassword, saveAuthSession } from "@/lib/auth";
import { googleProvider } from "@/lib/firebaseAuth";

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
      // Backend login first for session
      const session = await loginWithPassword({ email, password });
      saveAuthSession(session);
      // Context will sync Firebase state
      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Login gagal.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full space-y-6 rounded-2xl p-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Buyer Access</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Welcome back</h1>
        <p className="text-sm text-slate-500">Sign in to continue your curated marketplace journey.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
          Email Address
        </label>
        <Input
          id="email"
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
        ) : null}
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm font-semibold text-emerald-700">
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
        <button className="rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700" type="button" disabled>
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
      const session = await firebaseAuthService.syncFirebaseToBackend(result.user);
      if (session) {
        saveAuthSession(session);
      }
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (error) {
    return <p className="text-rose-600 text-sm">{error}</p>;
  }

  return (
    <button
      className="rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 flex items-center justify-center gap-2"
      type="button"
      onClick={handleGoogleLogin}
      disabled={isSubmitting}
    >
      <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.64 2.36 30.13 0 24 0 14.82 0 6.71 5.48 2.69 13.44l7.98 6.2C12.13 13.09 17.61 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.93 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.65A14.5 14.5 0 019.5 24c0-1.62.28-3.19.77-4.65l-7.98-6.2A23.93 23.93 0 000 24c0 3.77.9 7.34 2.49 10.49l8.18-5.84z"/><path fill="#EA4335" d="M24 48c6.13 0 11.27-2.03 15.02-5.52l-7.19-5.59c-2.01 1.35-4.59 2.16-7.83 2.16-6.01 0-11.1-4.06-12.92-9.51l-8.18 5.84C6.71 42.52 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
      {isSubmitting ? "Signing in..." : "Google"}
    </button>
  );
}
