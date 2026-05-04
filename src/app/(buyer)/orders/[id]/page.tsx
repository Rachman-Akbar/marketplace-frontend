"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { OrderStatusBadge } from "@/domains/order/components/OrderStatusBadge";
import { useCancelOrder } from "@/domains/order/hooks/useCancelOrder";
import { useOrderDetail } from "@/domains/order/hooks/useOrderDetail";
import {
  canCancelOrder,
  formatCurrency,
  formatDate,
  getOrderItems,
  getOrderTrackingRoute,
} from "@/domains/order/services/orderUtils";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const identifier = decodeURIComponent(params.id);
  const { order, loading, error, fetchOrder, setOrder } =
    useOrderDetail(identifier);

  const {
    cancelOrder,
    loading: cancelling,
    error: cancelError,
  } = useCancelOrder();

  async function handleCancel() {
    if (!order) return;

    const confirmed = window.confirm("Batalkan order ini?");
    if (!confirmed) return;

    const result = await cancelOrder(order.order_number, {
      reason: "Cancelled by customer",
    });

    if (result) {
      setOrder(result);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-sm">
        Loading order detail...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p>{error ?? "Order tidak ditemukan."}</p>
        <button
          type="button"
          onClick={() => void fetchOrder()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const items = getOrderItems(order);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/orders" className="font-semibold text-emerald-700">
            ← Kembali ke orders
          </Link>

          <h1 className="mt-4 text-4xl font-extrabold">
            Order #{order.order_number}
          </h1>

          <p className="mt-2 text-slate-500">
            Dibuat pada {formatDate(order.created_at)}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      {(cancelError || error) && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {cancelError || error}
        </div>
      )}

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Items</h2>

        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-semibold">{item.product_name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  Qty {item.quantity} ×{" "}
                  {formatCurrency(item.unit_price, order.currency)}
                </p>
              </div>

              <p className="font-bold">
                {formatCurrency(item.subtotal, order.currency)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Alamat Pengiriman</h2>
          <div className="mt-4 space-y-1 text-sm text-slate-600">
            <p>{order.shipping_address?.recipient_name}</p>
            <p>{order.shipping_address?.phone}</p>
            <p>{order.shipping_address?.address_line}</p>
            <p>
              {order.shipping_address?.district
                ? `${order.shipping_address.district}, `
                : ""}
              {order.shipping_address?.city}, {order.shipping_address?.province}
            </p>
            <p>{order.shipping_address?.postal_code}</p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Ringkasan</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal, order.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span>Ongkir</span>
              <span>
                {formatCurrency(order.shipping_cost, order.currency)}
              </span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold">
              <span>Total</span>
              <span>
                {formatCurrency(order.grand_total, order.currency)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => router.push(getOrderTrackingRoute(order))}
          className="rounded-lg bg-emerald-700 px-5 py-3 font-bold text-white"
        >
          Lacak Order
        </button>

        {canCancelOrder(order.status) ? (
          <button
            type="button"
            disabled={cancelling}
            onClick={handleCancel}
            className="rounded-lg bg-red-600 px-5 py-3 font-bold text-white disabled:opacity-50"
          >
            {cancelling ? "Membatalkan..." : "Batalkan Order"}
          </button>
        ) : null}
      </div>
    </div>
  );
}