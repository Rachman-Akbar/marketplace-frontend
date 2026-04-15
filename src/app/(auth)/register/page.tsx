import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  return (
    <Card className="w-full space-y-6 rounded-2xl p-8">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Create Account</p>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Join The Curated Canvas</h1>
        <p className="text-sm text-slate-500">Build your buyer profile and discover crafted essentials.</p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-slate-700">Full Name</label>
        <Input placeholder="Full name" />
        <label className="block text-sm font-semibold text-slate-700">Email Address</label>
        <Input placeholder="Email address" type="email" />
        <label className="block text-sm font-semibold text-slate-700">Password</label>
        <Input placeholder="Password" type="password" />
        <label className="flex items-center gap-2 text-xs text-slate-500">
          <input type="checkbox" defaultChecked /> I agree with Terms of Service and Privacy Policy
        </label>
        <Button className="w-full">Create Account</Button>
      </div>

      <div className="relative py-1">
        <div className="h-px bg-slate-200" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700">Google</button>
        <button className="rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700">Apple</button>
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
