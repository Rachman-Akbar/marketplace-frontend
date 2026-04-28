import Link from "next/link";
import type { CheckoutSummary, PaymentMethod, formatPrice, toNumber } from "@/lib/checkout/checkout";
import { SummaryRow } from "./SummaryRow";

type OrderSummaryProps = {
  summary: CheckoutSummary;
  paymentMethod: PaymentMethod;
  cartLoading: boolean;
  creatingOrder: boolean;
};

export function OrderSummary({
  summary,
  paymentMethod,
  cartLoading,
  creatingOrder,
}: OrderSummaryProps) {
  const isDisabled = creatingOrder || cartLoading || summary.items.length === 0;

  return (
    <aside className="h-fit rounded-2xl bg-slate-100 p-6 shadow-sm lg:sticky lg:top-6 lg:col-span-4">
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Order Summary
      </h2>

      <div className="mt-5 space-y-4">
        {cartLoading ? (
          <div className="space-y-3">
            <div className="h-20 animate-pulse rounded-xl bg-white" />
            <div className="h-20 animate-pulse rounded-xl bg-white" />
          </div>
        ) : (
          summary.items.map((item) => {
            const price = toNumber(item.price);
            const quantity = toNumber(item.quantity);
            const subtotal = toNumber(item.subtotal, price * quantity);

            return (
              <div
                key={item.id}
                className="flex justify-between gap-4 rounded-xl bg-white p-4"
              >
                <div className="min-w-0">
                  <p className="line-clamp-1 font-semibold text-slate-900">
                    {item.product_name}
                  </p>

                  <p className="text-sm text-slate-500">
                    {quantity} × {formatPrice(price)}
                  </p>
                </div>

                <p className="shrink-0 font-bold text-slate-900">
                  {formatPrice(subtotal)}
                </p>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6 space-y-3 text-sm text-slate-600">
        <SummaryRow label="Total Item" value={summary.totalQuantity} />

        <SummaryRow label="Subtotal" value={formatPrice(summary.subtotal)} />

        <SummaryRow
          label="Shipping"
          value={summary.shipping === 0 ? "Gratis" : formatPrice(summary.shipping)}
          highlight
        />

        <SummaryRow
          label="Estimated Tax"
          value={formatPrice(summary.estimatedTax)}
        />

        <SummaryRow
          label="Payment"
          value={paymentMethod.replaceAll("_", " ")}
        />
      </div>

      <div className="my-5 border-t border-slate-300" />

      <div className="flex items-end justify-between gap-4">
        <span className="text-sm font-semibold text-slate-600">Total</span>

        <span className="text-4xl font-extrabold text-emerald-700">
          {formatPrice(summary.grandTotal)}
        </span>
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="mt-6 w-full rounded-lg bg-emerald-700 py-3 font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {creatingOrder ? "Creating Order..." : "Place Order"}
      </button>

      <Link
        href="/cart"
        className="mt-3 block text-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
      >
        Kembali ke Cart
      </Link>
    </aside>
  );
}