import { formatCurrency } from "@/domains/order/services/orderUtils";
import type { OrderItem } from "@/domains/order/types";

type Props = {
  items: OrderItem[];
  currency?: string | null;
};

export default function OrderItemsTable({ items, currency = "IDR" }: Props) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 text-sm text-slate-500 shadow-sm">
        Tidak ada item pada order ini.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3">Produk</th>
            <th className="px-4 py-3">Qty</th>
            <th className="px-4 py-3">Harga</th>
            <th className="px-4 py-3 text-right">Subtotal</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {items.map((item) => {
            const itemCurrency = item.currency ?? currency ?? "IDR";

            return (
              <tr key={item.id}>
                <td className="px-4 py-4">
                  <p className="font-bold text-slate-900">
                    {item.product_name}
                  </p>

                  {item.sku ? (
                    <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                  ) : null}
                </td>

                <td className="px-4 py-4 text-slate-600">
                  {item.quantity}
                </td>

                <td className="px-4 py-4 text-slate-600">
                  {formatCurrency(item.unit_price, itemCurrency)}
                </td>

                <td className="px-4 py-4 text-right font-bold text-emerald-700">
                  {formatCurrency(item.subtotal, itemCurrency)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}