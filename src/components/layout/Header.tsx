import Link from "next/link";
import { Container } from "@/components/layout/Container";

const navItems = [
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "New Arrivals" },
  { href: "/products", label: "Deals" },
];

export function Header() {
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
            <Link href="/profile" className="rounded-full bg-emerald-50 p-2 text-emerald-700 transition hover:bg-emerald-100">
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
