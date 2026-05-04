import type { CheckoutSummary } from "@/domains/checkout/types";
import { formatPrice } from "@/domains/checkout/services/checkoutService";
import { SummaryRow } from "@/domains/checkout/components/SummaryRow";

type OrderSummaryProps = {
  summary: CheckoutSummary;
};

export function OrderSummary({ summary }: OrderSummaryProps) {
  return (
    <aside className="sticky top-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h2 className="text-lg font-semibold text-slate-950">Ringkasan Order</h2>

      <div className="mt-5 space-y-4">
        {summary.items.length > 0 ? (
          summary.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between gap-4"
            >
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {item.product_name}
                </p>

                {item.variant ? (
                  <p className="mt-0.5 text-xs text-slate-500">
                    {item.variant}
                  </p>
                ) : null}

                <p className="mt-1 text-xs text-slate-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-950">
                {formatPrice(item.subtotal)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">Belum ada item.</p>
        )}
      </div>

      <div className="my-5 border-t border-slate-200" />

      <div className="space-y-3">
        <SummaryRow label="Subtotal" value={formatPrice(summary.subtotal)} />
        <SummaryRow label="Ongkir" value={formatPrice(summary.shipping)} />
        <SummaryRow label="Pajak" value={formatPrice(summary.estimatedTax)} />
      </div>

      <div className="my-5 border-t border-slate-200" />

      <SummaryRow
        label="Total"
        value={formatPrice(summary.grandTotal)}
        strong
      />
    </aside>
  );
}