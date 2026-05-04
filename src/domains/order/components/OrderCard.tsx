import { Order } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";

type Props = {
  order: Order;
  onClick?: (order: Order) => void;
};

function formatCurrency(value: number, currency = "IDR") {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function OrderCard({ order, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(order)}
      className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-gray-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900">{order.order_number}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {new Date(order.created_at).toLocaleString("id-ID")}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Payment:{" "}
          <span className="font-medium capitalize text-gray-700">
            {order.payment_status}
          </span>
        </p>

        <p className="font-semibold text-gray-900">
          {formatCurrency(order.grand_total, order.currency)}
        </p>
      </div>
    </button>
  );
}