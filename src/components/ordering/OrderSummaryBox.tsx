import { formatCurrency } from "@/lib/orderUtils";
import { Order } from "@/types/order";

type Props = {
  order: Order;
};

export default function OrderSummaryBox({ order }: Props) {
  return (
    <aside className="h-fit rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal, order.currency)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatCurrency(order.shipping_cost, order.currency)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>{formatCurrency(order.discount_total, order.currency)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>
          <span>{formatCurrency(order.tax_total, order.currency)}</span>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-200 pt-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Total Amount
        </p>
        <p className="mt-1 text-4xl font-extrabold text-emerald-700">
          {formatCurrency(order.grand_total, order.currency)}
        </p>
      </div>
    </aside>
  );
}