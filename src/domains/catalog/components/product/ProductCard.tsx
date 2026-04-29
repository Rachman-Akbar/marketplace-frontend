import Link from "next/link";

type ProductCardProps = {
  id: number;
  title: string;
  image: string;
  price: number;
  metaText?: string;
  soldText?: string;
  href: string;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductCard({
  title,
  image,
  price,
  metaText,
  soldText,
  href,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-square overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-1 p-4">
        {metaText ? (
          <p className="text-xs font-medium text-slate-500">{metaText}</p>
        ) : null}

        <h3 className="line-clamp-2 font-bold text-slate-900">{title}</h3>

        <p className="font-bold text-emerald-700">{formatPrice(price)}</p>

        {soldText ? (
          <p className="text-xs text-slate-500">{soldText}</p>
        ) : null}
      </div>
    </Link>
  );
}