"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { AUTH_SESSION_CHANGED_EVENT, getVerifiedAuthSession } from "@/lib/auth";

const navItems = [
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "New Arrivals" },
  { href: "/products", label: "Deals" },
];

export function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadAuthState() {
      if (mounted) {
        setIsCheckingAuth(true);
      }

      const session = await getVerifiedAuthSession();
      if (!session) {
        if (mounted) {
          setIsLoggedIn(false);
          setIsCheckingAuth(false);
        }

        return;
      }

      if (mounted) {
        setIsLoggedIn(true);
        setIsCheckingAuth(false);
      }
    }

    function handleAuthSessionChanged() {
      void loadAuthState();
    }

    loadAuthState();
    window.addEventListener(AUTH_SESSION_CHANGED_EVENT, handleAuthSessionChanged);
    window.addEventListener("storage", handleAuthSessionChanged);

    return () => {
      mounted = false;
      window.removeEventListener(AUTH_SESSION_CHANGED_EVENT, handleAuthSessionChanged);
      window.removeEventListener("storage", handleAuthSessionChanged);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(44,52,54,0.05)]">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-emerald-800">
              The Curated Canvas
            </Link>
            <nav className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className="text-sm font-medium text-slate-500 transition-colors hover:text-emerald-600"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden max-w-sm flex-1 lg:block">
            <div className="flex items-center gap-2 rounded-full bg-slate-200/70 px-4 py-2.5">
              <span className="material-symbols-outlined text-slate-500">search</span>
              <input
                className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none"
                placeholder="Search curated collections..."
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/cart" className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700">
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
            <Link
              href="/notifications"
              className="relative rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
            </Link>
            <Link href="/chat" className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-emerald-700">
              <span className="material-symbols-outlined">chat</span>
            </Link>

            {!isCheckingAuth && isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="rounded-full bg-emerald-50 p-2 text-emerald-700 transition hover:bg-emerald-100"
                  aria-label="Profile"
                >
                  <span className="material-symbols-outlined">person</span>
                </Link>
              </>
            ) : null}

            {!isCheckingAuth && !isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
                >
                  Register
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </Container>
    </header>
  );
}
