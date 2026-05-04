"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { OrderStatusBadge } from "@/domains/order/components/OrderStatusBadge";
import { useOrderDetail } from "@/domains/order/hooks/useOrderDetail";
import { formatDate } from "@/domains/order/services/orderUtils";

export default function OrderTrackingPage() {
  const params = useParams<{ id: string }>();
  const identifier = decodeURIComponent(params.id);

  const { order, loading, error } = useOrderDetail(identifier);

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-sm">
        Loading tracking...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error ?? "Order tidak ditemukan."}
      </div>
    );
  }

  const histories = order.status_histories ?? [];

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/orders/${encodeURIComponent(order.order_number)}`}
          className="font-semibold text-emerald-700"
        >
          ← Kembali ke detail
        </Link>

        <h1 className="mt-4 text-4xl font-extrabold">
          Tracking Order #{order.order_number}
        </h1>

        <div className="mt-4">
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Status History</h2>

        <div className="mt-6 space-y-5">
          {histories.length > 0 ? (
            histories.map((history) => (
              <div
                key={history.id}
                className="border-l-4 border-emerald-600 pl-4"
              >
                <p className="font-bold capitalize">{history.to_status}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {formatDate(history.created_at)}
                </p>
                {history.note ? (
                  <p className="mt-2 text-sm text-slate-600">
                    {history.note}
                  </p>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              Belum ada riwayat tracking.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}