"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProfileLogoutButton } from "@/components/auth/ProfileLogoutButton";
import { type AuthUser, getVerifiedAuthSession } from "@/lib/auth";

function splitName(fullName: string | null): { firstName: string; lastName: string } {
  if (!fullName || !fullName.trim()) {
    return { firstName: "", lastName: "" };
  }

  const chunks = fullName.trim().split(/\s+/);
  const firstName = chunks[0] ?? "";
  const lastName = chunks.length > 1 ? chunks.slice(1).join(" ") : "";

  return { firstName, lastName };
}

export default function ProfileDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      const session = await getVerifiedAuthSession();

      if (!mounted) {
        return;
      }

      if (!session) {
        router.replace("/login");
        return;
      }

      setUser(session.user);
      setIsLoading(false);
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [router]);

  const displayName = user?.name?.trim() || "User";
  const email = user?.email ?? "-";
  const avatarUrl = user?.avatar?.trim() || "https://ui-avatars.com/api/?background=047857&color=ffffff&name=User";
  const { firstName, lastName } = useMemo(() => splitName(user?.name ?? null), [user?.name]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden rounded-xl bg-slate-100 p-4 lg:block">
        <h2 className="px-2 py-3 text-2xl font-extrabold tracking-tight text-emerald-800">Account Settings</h2>
        <nav className="mt-2 space-y-1 text-sm">
          {['Profile Info', 'Addresses', 'Payments', 'Wishlist', 'Orders'].map((n) => (
            <a key={n} className={`block rounded-lg px-3 py-2 ${n === 'Profile Info' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-200'}`} href="#">{n}</a>
          ))}
        </nav>
      </aside>

      <section className="space-y-6">
        <div className="flex items-center justify-end">
          <ProfileLogoutButton />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm md:col-span-2">
            <div className="flex items-center gap-5">
              <div className="relative">
                <img src={avatarUrl} alt="avatar" className="h-24 w-24 rounded-full border-4 border-emerald-300 object-cover" />
                <button className="absolute -bottom-1 -right-1 rounded-full bg-emerald-700 p-1.5 text-white">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-extrabold tracking-tight">{displayName}</h1>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700">Pro Member</span>
                </div>
                <p className="mt-1 text-slate-500">Curating aesthetics since Oct 2023</p>
                <div className="mt-4 flex gap-3">
                  <div className="rounded-lg bg-slate-200 px-4 py-2 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Collections</p>
                    <p className="text-xl font-extrabold text-emerald-700">24</p>
                  </div>
                  <div className="rounded-lg bg-slate-200 px-4 py-2 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Reviews</p>
                    <p className="text-xl font-extrabold text-emerald-700">12</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-emerald-700 p-6 text-white shadow-sm">
            <span className="material-symbols-outlined text-3xl">diamond</span>
            <p className="mt-3 text-2xl font-extrabold tracking-tight">Canvas Platinum</p>
            <p className="mt-2 text-sm text-emerald-100">You&apos;re 2,400 points away from Emerald Status.</p>
            <div className="mt-4 h-2 rounded-full bg-emerald-900">
              <div className="h-2 w-3/4 rounded-full bg-emerald-300" />
            </div>
            <p className="mt-1 text-[10px] text-emerald-100">7,600 / 10,000 XP</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-4 flex items-center gap-2 text-3xl font-extrabold tracking-tight">
              <span className="material-symbols-outlined text-emerald-700">badge</span>
              Personal Details
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">First Name</label>
                <input className="w-full rounded-lg bg-slate-200 px-4 py-3" value={firstName} readOnly />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Last Name</label>
                <input className="w-full rounded-lg bg-slate-200 px-4 py-3" value={lastName} readOnly />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-600">Email Address</label>
                <input className="w-full rounded-lg bg-slate-200 px-4 py-3" value={email} readOnly />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-600">Bio</label>
                <textarea className="min-h-28 w-full rounded-lg bg-slate-200 px-4 py-3" value="Art director and minimalist furniture collector. Obsessed with natural materials and Bauhaus principles." readOnly />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button className="rounded-lg px-5 py-2 font-semibold text-slate-600">Discard</button>
              <button className="rounded-lg bg-emerald-700 px-6 py-2.5 font-bold text-white">Save Changes</button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-extrabold tracking-tight">Recent Activity</h3>
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-emerald-700">inventory_2</span>Order #8821 Delivered</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-sky-700">star</span>Review Published</li>
                <li className="flex gap-2"><span className="material-symbols-outlined text-base text-emerald-700">favorite</span>Added to Wishlist</li>
              </ul>
              <button className="mt-5 text-xs font-bold uppercase tracking-widest text-emerald-700">View all activity</button>
            </div>

            <div className="rounded-xl bg-slate-200 p-6">
              <h3 className="mb-2 text-2xl font-extrabold tracking-tight">Privacy & Security</h3>
              <p className="text-sm text-slate-600">2-step verification is currently disabled. Protect your curated gallery.</p>
              <button className="mt-4 w-full rounded-lg bg-white py-2.5 font-semibold text-slate-700">Enable Security</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
