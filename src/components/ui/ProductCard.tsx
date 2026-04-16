import Link from "next/link";

type ProductCardProps = {
  id?: number | string;
  title: string;
  image?: string;
  price: number | string;
  originalPrice?: number | string;
  discountLabel?: string;
  voucherLabel?: string;
  rating?: number;
  soldText?: string;
  metaText?: string;
  href?: string;
  imageTone?: string;
};

function formatPrice(value: number | string): string {
  if (typeof value === "number") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  return value;
}

export function ProductCard({
  title,
  image,
  price,
  originalPrice,
  discountLabel,
  voucherLabel,
  rating,
  soldText,
  metaText,
  href,
  imageTone = "from-stone-200 to-slate-100",
}: ProductCardProps) {
  const imageBlock = (
    <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${imageTone}`}>
      {image ? <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> : null}
      {discountLabel ? (
        <span className="absolute left-3 top-3 rounded-full bg-emerald-700 px-3 py-1 text-[10px] font-extrabold tracking-wide text-white">
          {discountLabel}
        </span>
      ) : null}
      {voucherLabel ? (
        <span className="absolute left-3 top-11 bg-lime-100 px-2 py-1 text-[10px] font-semibold text-slate-700">
          {voucherLabel}
        </span>
      ) : null}
      <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm" type="button" aria-label="Favorite">
        <span className="material-symbols-outlined text-base">favorite</span>
      </button>
    </div>
  );

  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg">
      {href ? <Link href={href} className="block">{imageBlock}</Link> : imageBlock}

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-[29px] font-bold leading-tight tracking-tight text-slate-900">{title}</h3>
        {metaText ? <p className="text-xs text-slate-500">{metaText}</p> : null}
        {(typeof rating === "number" || soldText) ? (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            {typeof rating === "number" ? (
              <>
                <span className="material-symbols-outlined text-sm text-amber-500">star</span>
                <span className="font-semibold text-slate-700">{rating.toFixed(1)}</span>
              </>
            ) : null}
            {soldText ? <span>{soldText}</span> : null}
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          <p className="text-[32px] font-extrabold leading-none text-emerald-700">{formatPrice(price)}</p>
          {originalPrice ? <p className="text-sm text-slate-400 line-through">{formatPrice(originalPrice)}</p> : null}
        </div>
      </div>
    </article>
  );
}
