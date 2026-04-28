'use client';

import Link from 'next/link';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

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
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductCard({
  id,
  title,
  image,
  price,
  metaText,
  soldText,
  href,
}: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
      <Link href={href} className="block cursor-pointer">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-110"
          />
        </div>

        <div className="space-y-2 p-4 pb-2">
          <h3 className="line-clamp-2 min-h-[48px] text-base font-semibold transition-colors group-hover:text-blue-600">
            {title}
          </h3>

          <div className="text-lg font-bold">{formatPrice(price)}</div>

          {metaText && (
            <p className="line-clamp-1 text-sm text-gray-500">{metaText}</p>
          )}

          {soldText && (
            <p className="line-clamp-1 text-xs text-gray-400">{soldText}</p>
          )}

          <div className="pt-1 text-sm font-medium text-blue-600 opacity-0 transition duration-300 group-hover:opacity-100">
            Lihat produk →
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <AddToCartButton
          productId={id}
          className="w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-50"
        />
      </div>
    </div>
  );
}