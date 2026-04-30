import Link from "next/link";
import type { CartItem } from "../types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

type CartItemRowProps = {
  item: CartItem;
  disabled?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function CartItemRow({
  item,
  disabled,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Link
          href={`/products/${item.product_id}`}
          className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-100"
        >
          {item.product_image ? (
            <img
              src={item.product_image}
              alt={item.product_name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : null}
        </Link>

        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Cart Item
          </p>

          <Link
            href={`/products/${item.product_id}`}
            className="text-2xl font-bold tracking-tight hover:text-emerald-700"
          >
            {item.product_name}
          </Link>

          <p className="text-sm text-slate-500">
            Harga satuan: {formatPrice(item.price)}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center overflow-hidden rounded-lg border">
              <button
                type="button"
                disabled={disabled}
                onClick={onDecrease}
                className="px-3 py-1 font-bold disabled:opacity-40"
              >
                -
              </button>

              <span className="min-w-10 text-center">{item.quantity}</span>

              <button
                type="button"
                disabled={disabled}
                onClick={onIncrease}
                className="px-3 py-1 font-bold disabled:opacity-40"
              >
                +
              </button>
            </div>

            <button
              type="button"
              disabled={disabled}
              onClick={onRemove}
              className="text-sm font-semibold text-red-600 disabled:opacity-40"
            >
              Hapus
            </button>
          </div>
        </div>

        <p className="text-2xl font-bold sm:text-3xl">
          {formatPrice(item.subtotal)}
        </p>
      </div>
    </article>
  );
}