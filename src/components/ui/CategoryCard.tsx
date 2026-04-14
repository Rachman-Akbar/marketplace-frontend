import Link from "next/link";
import { cn } from "@/lib/cn";

type CategoryCardProps = {
  name: string;
  itemCount: number;
  href?: string;
  tone?: "earth" | "charcoal" | "sage" | "sun";
};

const toneMap = {
  earth: "from-amber-800 via-amber-700 to-stone-700",
  charcoal: "from-slate-900 via-slate-800 to-slate-700",
  sage: "from-emerald-900 via-emerald-700 to-emerald-600",
  sun: "from-orange-800 via-amber-700 to-yellow-600",
};

export function CategoryCard({ name, itemCount, href = "/categories", tone = "earth" }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-200 p-5 text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        "bg-gradient-to-br",
        toneMap[tone],
      )}
    >
      <div className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-1 text-xs">Browse</div>
      <div className="relative mt-16 space-y-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-white/80">{itemCount} items</p>
      </div>
    </Link>
  );
}
