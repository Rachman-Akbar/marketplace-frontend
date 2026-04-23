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

function formatPrice(price: number) {
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
      className="group block cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 min-h-[48px] text-base font-semibold transition-colors group-hover:text-blue-600">
          {title}
        </h3>

        <div className="text-lg font-bold">{formatPrice(price)}</div>

        {metaText && (
          <p className="text-sm text-gray-500 line-clamp-1">{metaText}</p>
        )}

        {soldText && (
          <p className="text-xs text-gray-400 line-clamp-1">{soldText}</p>
        )}

        <div className="pt-1 text-sm font-medium text-blue-600 opacity-0 transition duration-300 group-hover:opacity-100">
          Lihat produk →
        </div>
      </div>
    </Link>
  );
}