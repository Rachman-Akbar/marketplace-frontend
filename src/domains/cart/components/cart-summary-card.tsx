import Link from "next/link";
import type { Cart } from "../types";

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

type CartSummaryCardProps = {
  cart: Cart;
};

export function CartSummaryCard({ cart }: CartSummaryCardProps) {
  const subtotal = cart.total_price;
  const shipping = 0;
  const estimatedTax = Math.round(subtotal * 0.08);
  const grandTotal = subtotal + shipping + estimatedTax;

  return (
    <aside className="h-fit rounded-xl bg-slate-300/40 p-8 lg:col-span-4">
      <h2 className="text-4xl font-extrabold tracking-tight">
        Order Summary
      </h2>

      <div className="mt-5 space-y-2 text-slate-600">
        <div className="flex justify-between">
          <span>Total Item</span>
          <span>{cart.total_quantity}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-bold text-emerald-700">Complimentary</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span>{formatPrice(estimatedTax)}</span>
        </div>
      </div>

      <div className="mt-5 text-5xl font-extrabold text-emerald-700">
        {formatPrice(grandTotal)}
      </div>

      <div className="mt-5 flex gap-2">
        <input
          className="w-full rounded-lg bg-white px-3 py-2"
          placeholder="CANVAS20"
        />

        <button
          type="button"
          className="rounded-lg bg-slate-600 px-4 py-2 font-bold text-white"
        >
          Apply
        </button>
      </div>

      <Link
        href="/checkout"
        className="mt-5 block w-full rounded-lg bg-emerald-700 py-3 text-center font-bold text-white"
      >
        Proceed to Checkout
      </Link>
    </aside>
  );
}