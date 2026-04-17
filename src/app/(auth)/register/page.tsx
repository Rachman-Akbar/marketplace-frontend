"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { registerWithPassword, saveAuthSession } from "@/lib/auth";

// Untuk register native, tidak perlu register ke Firebase. Jika ingin Google, gunakan tombol Google terpisah.

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!agreeTerms) {
      setError("Anda harus menyetujui Terms of Service dan Privacy Policy.");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const session = await registerWithPassword({
        name,
        email,
        password,
        passwordConfirmation,
      });
      saveAuthSession(session);
      router.push("/");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Register gagal.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full space-y-6 rounded-2xl p-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Create Account</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Join The Curated Canvas</h1>
        <p className="text-sm text-slate-500">Build your buyer profile and discover crafted essentials.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="name">
          Full Name
        </label>
        <Input
          id="name"
          placeholder="Full name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
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
          minLength={8}
        />
        <label className="block text-sm font-semibold text-slate-700" htmlFor="password-confirmation">
          Confirm Password
        </label>
        <Input
          id="password-confirmation"
          placeholder="Confirm password"
          type="password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
          minLength={8}
        />
        <label className="flex items-center gap-2 text-xs text-slate-500">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(event) => setAgreeTerms(event.target.checked)}
          />{" "}
          I agree with Terms of Service and Privacy Policy
        </label>
        {error ? (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
        ) : null}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="relative py-1">
        <div className="h-px bg-slate-200" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700" type="button">
          Google
        </button>
        <button className="rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700" type="button">
          Apple
        </button>
      </div>

      <p className="text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link href="/login" className="font-semibold text-emerald-700">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
