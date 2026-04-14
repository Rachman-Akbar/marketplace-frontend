import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  return (
    <Card className="space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Create Account</p>
        <h1 className="text-3xl font-semibold text-slate-900">Join The Curated Canvas</h1>
        <p className="text-sm text-slate-500">Build your buyer profile and discover crafted essentials.</p>
      </div>

      <div className="space-y-4">
        <Input placeholder="Full name" />
        <Input placeholder="Email address" type="email" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full">Create Account</Button>
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
