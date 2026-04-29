import Link from "next/link";

const navItems = [
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/products",
    label: "New Arrivals",
  },
  {
    href: "/products",
    label: "Deals",
  },
];

export function HeaderNav() {
  return (
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
  );
}