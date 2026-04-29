import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { getServerAuthSession } from "@/lib/auth/server-session";
import { getServerCartSummary } from "@/lib/cart/server-cart";

import { HeaderActions } from "./HeaderActions";
import { HeaderNav } from "./HeaderNav";
import { HeaderSearch } from "./HeaderSearch";

export async function Header() {
  const session = await getServerAuthSession();

  const isLoggedIn = !!session;

  const cart = isLoggedIn
    ? await getServerCartSummary()
    : {
        total_quantity: 0,
      };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 shadow-[0_10px_30px_rgba(44,52,54,0.05)] backdrop-blur-xl">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-tight text-emerald-800"
            >
              The Curated Canvas
            </Link>

            <HeaderNav />
          </div>

          <HeaderSearch />

          <HeaderActions
            isLoggedIn={isLoggedIn}
            cartCount={cart.total_quantity}
          />
        </div>
      </Container>
    </header>
  );
}