"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useOrderDetail } from "@/hooks/useOrderDetail";
import { formatDate, getOrderHistories } from "@/lib/orderUtils";
import { OrderStatus } from "@/types/order";
import OrderStatusBadge from "@/components/ordering/OrderStatusBadge";

const trackingSteps: Array<{
  label: string;
  status: OrderStatus;
}> = [
  { label: "Order created", status: "pending" },
  { label: "Order confirmed", status: "confirmed" },
  { label: "Packed by seller", status: "processing" },
  { label: "Shipped with courier", status: "shipped" },
  { label: "Delivered", status: "delivered" },
];

const statusOrder: Record<OrderStatus, number> = {
  pending: 1,
  confirmed: 2,
  processing: 3,
  shipped: 4,
  delivered: 5,
  cancelled: 0,
};

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = String(params.id);

  const { order, loading, error } = useOrderDetail(orderId);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-sm">
          Loading tracking...
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-4xl">
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

  const currentStep = statusOrder[order.status];
  const histories = getOrderHistories(order);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <Link
          href={`/orders/${order.id}`}
          className="mb-4 inline-block text-sm font-bold text-emerald-700"
        >
          ← Back to Detail
        </Link>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Order Tracking
            </h1>
            <p className="mt-2 text-slate-500">
              Track progress for order #{order.order_number}
            </p>
          </div>

          <OrderStatusBadge status={order.status} />
        </div>
      </header>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Shipment Progress
          </h2>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold capitalize text-emerald-700">
            {order.status}
          </span>
        </div>

        {order.status === "cancelled" ? (
          <div className="rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-700">
            Order ini sudah dibatalkan.
          </div>
        ) : (
          <div className="space-y-6">
            {trackingSteps.map((step, index) => {
              const active = currentStep >= statusOrder[step.status];
              const isCurrent = currentStep === statusOrder[step.status];

              return (
                <div key={step.status} className="flex items-center gap-3">
                  <div
                    className={`h-4 w-4 rounded-full ${
                      active ? "bg-emerald-700" : "bg-slate-300"
                    }`}
                  />

                  <div>
                    <p
                      className={`text-sm ${
                        active
                          ? "font-semibold text-slate-800"
                          : "text-slate-500"
                      }`}
                    >
                      {step.label}
                    </p>

                    {isCurrent ? (
                      <p className="mt-1 text-xs font-semibold text-emerald-700">
                        Current status
                      </p>
                    ) : null}
                  </div>

                  <span className="ml-auto text-xs text-slate-400">
                    Step {index + 1}
                  </span>
                </div>
              );
            })}
          </div>
        )}
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

      <div className="flex justify-center">
        <Link
          href={`/orders/${order.id}`}
          className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white"
        >
          View Order Detail
        </Link>
      </div>
    </div>
  );
}