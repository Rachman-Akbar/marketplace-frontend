import Link from "next/link";
import { cn } from "@/lib/cn";

type CategoryCardProps = {
  name: string;
  itemCount: number;
  href?: string;
  imageUrl?: string | null;
  tone?: "earth" | "charcoal" | "sage" | "sun";
};

const toneMap = {
  earth: "from-amber-800 via-amber-700 to-stone-700",
  charcoal: "from-slate-900 via-slate-800 to-slate-700",
  sage: "from-emerald-900 via-emerald-700 to-emerald-600",
  sun: "from-orange-800 via-amber-700 to-yellow-600",
};

export function CategoryCard({
  name,
  itemCount,
  href = "/products",
  imageUrl,
  tone = "earth",
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-200 text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        imageUrl ? "h-[400px]" : "p-5 bg-gradient-to-br",
        !imageUrl && toneMap[tone]
      )}
    >
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-colors duration-300 group-hover:from-black/75" />
          <div className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-1 text-xs">
            Browse
          </div>
          <div className="absolute inset-x-0 bottom-0 p-8">
            <h3 className="text-2xl font-extrabold tracking-tight">{name}</h3>
            <p className="mt-1 text-sm text-white/80">{itemCount}+ Items</p>
          </div>
        </>
      ) : (
        <>
          <div className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-1 text-xs">
            Browse
          </div>
          <div className="relative mt-16 space-y-1">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-white/80">{itemCount} items</p>
          </div>
        </>
      )}
    </Link>
  );
}