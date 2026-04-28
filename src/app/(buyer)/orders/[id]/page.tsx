"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCancelOrder } from "@/hooks/useCancelOrder";
import { useOrderDetail } from "@/hooks/useOrderDetail";
import {
  formatCurrency,
  formatDate,
  getOrderHistories,
  getOrderItems,
  resolveShippingAddress,
} from "@/lib/orderUtils";
import OrderItemsTable from "@/components/ordering/OrderItemsTable";
import OrderStatusBadge from "@/components/ordering/OrderStatusBadge";
import OrderSummaryBox from "@/components/ordering/OrderSummaryBox";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = String(params.id);

  const { order, loading, error, fetchOrder } = useOrderDetail(orderId);
  const { cancelOrder, loading: cancelling, error: cancelError } =
    useCancelOrder();

  async function handleCancel() {
    const reason = window.prompt("Masukkan alasan pembatalan:");

    if (!reason) return;

    await cancelOrder(orderId, {
      reason,
    });

    await fetchOrder(orderId);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-sm">
          Loading order detail...
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error || "Order tidak ditemukan"}
        </div>

        <Link
          href="/orders"
          className="mt-5 inline-block font-bold text-emerald-700"
        >
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const address = resolveShippingAddress(order.shipping_address);
  const items = getOrderItems(order);
  const histories = getOrderHistories(order);

  const canCancel = ["pending", "confirmed", "processing"].includes(
    order.status,
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <Link
          href="/orders"
          className="mb-4 inline-block text-sm font-bold text-emerald-700"
        >
          ← Back to Orders
        </Link>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Order Detail
            </h1>
            <p className="mt-2 text-slate-500">
              Order #{order.order_number} • {formatDate(order.created_at)}
            </p>
          </div>

          <OrderStatusBadge status={order.status} />
        </div>
      </header>

      {cancelError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {cancelError}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
              Items
            </h2>

            <OrderItemsTable items={items} />
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
              Payment and Shipping
            </h2>

            <div className="space-y-3 text-sm text-slate-600">
              <p>
                Payment Method:{" "}
                <span className="font-bold capitalize text-slate-900">
                  {order.payment_method?.replaceAll("_", " ") ?? "-"}
                </span>
              </p>

              <p>
                Payment Status:{" "}
                <span className="font-bold capitalize text-slate-900">
                  {order.payment_status}
                </span>
              </p>

              <div className="rounded-lg bg-slate-100 p-4">
                <p className="font-bold text-slate-900">
                  {address.recipient_name}
                </p>
                <p>{address.phone}</p>
                <p>{address.address_line}</p>
                <p>
                  {address.district}, {address.city}
                </p>
                <p>
                  {address.province}, {address.postal_code}
                </p>
                {address.notes ? <p>Catatan: {address.notes}</p> : null}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
              Status History
            </h2>

            <div className="space-y-3">
              {histories.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Belum ada riwayat status.
                </p>
              ) : (
                histories.map((history) => (
                  <div
                    key={history.id}
                    className="rounded-lg bg-slate-100 p-4 text-sm"
                  >
                    <p className="font-bold capitalize text-slate-900">
                      {history.from_status ?? "-"} → {history.to_status}
                    </p>

                    {history.note ? (
                      <p className="mt-1 text-slate-600">{history.note}</p>
                    ) : null}

                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(history.created_at)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <OrderSummaryBox order={order} />

          <aside className="h-fit rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-extrabold tracking-tight">
              Order Actions
            </h2>

            <Link
              href={`/orders/${order.id}/tracking`}
              className="block w-full rounded-lg bg-emerald-700 py-3 text-center font-bold text-white"
            >
              Track Order
            </Link>

            <button
              type="button"
              className="mt-3 w-full rounded-lg border border-slate-300 py-3 font-semibold text-slate-700"
            >
              Download Invoice
            </button>

            {canCancel ? (
              <button
                type="button"
                disabled={cancelling}
                onClick={handleCancel}
                className="mt-3 w-full rounded-lg bg-red-50 py-3 font-semibold text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cancelling ? "Cancelling..." : "Cancel Order"}
              </button>
            ) : null}

            <div className="mt-5 rounded-lg bg-slate-100 p-4">
              <p className="text-xs text-slate-500">Total Amount</p>
              <p className="text-3xl font-extrabold text-emerald-700">
                {formatCurrency(order.grand_total, order.currency)}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}