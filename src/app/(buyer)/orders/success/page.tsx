"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useOrderDetail } from "@/hooks/useOrderDetail";
import {
  formatCurrency,
  getOrderItems,
  resolveShippingAddress,
} from "@/lib/ordering/orderUtils";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const { order, loading, error } = useOrderDetail(orderId);

  const address = order ? resolveShippingAddress(order.shipping_address) : null;
  const items = order ? getOrderItems(order) : [];

  if (!orderId) {
    return (
      <div className="mx-auto max-w-3xl py-8 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-200">
          <span className="material-symbols-outlined text-5xl text-emerald-700">
            check_circle
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight">
          Order berhasil dibuat.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-slate-500">
          Kamu bisa melihat detail pesanan di halaman daftar order.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/orders"
            className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white"
          >
            View Orders
          </Link>

          <Link
            href="/products"
            className="rounded-lg bg-slate-300 px-6 py-3 font-bold text-slate-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl py-8 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-200">
        <span className="material-symbols-outlined text-5xl text-emerald-700">
          check_circle
        </span>
      </div>

      <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
        Your order has been created.
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-slate-500">
        Terima kasih. Pesanan kamu berhasil dibuat dan akan segera diproses.
      </p>

      {loading ? (
        <div className="mt-8 rounded-xl bg-white p-6 text-slate-500 shadow-sm">
          Loading order...
        </div>
      ) : null}

      {error ? (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!loading && !error && order ? (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 text-left shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Order Details
              </p>

              <p className="mt-3 text-sm text-slate-500">Order Number</p>
              <p className="break-all text-2xl font-extrabold text-emerald-700">
                #{order.order_number}
              </p>

              <p className="mt-3 text-sm text-slate-500">Status</p>
              <p className="text-2xl font-extrabold capitalize">
                {order.status}
              </p>

              <p className="mt-3 text-sm text-slate-500">Payment Status</p>
              <p className="font-semibold capitalize">
                {order.payment_status}
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-left shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Payment & Shipping
              </p>

              <p className="mt-3 text-sm text-slate-500">Payment Method</p>
              <p className="font-semibold capitalize">
                {order.payment_method?.replaceAll("_", " ") ?? "-"}
              </p>

              <p className="mt-3 text-sm text-slate-500">Shipping Address</p>
              <p className="font-semibold">
                {address
                  ? `${address.address_line}, ${address.district}, ${address.city}, ${address.province}, ${address.postal_code}`
                  : "-"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-200 p-5">
            <div className="flex -space-x-3">
              {items.length > 0 ? (
                items.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-xl font-extrabold text-emerald-700 ring-4 ring-slate-200"
                    title={item.product_name}
                  >
                    {item.product_name?.charAt(0)?.toUpperCase() ?? "P"}
                  </div>
                ))
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-xl font-extrabold text-emerald-700 ring-4 ring-slate-200">
                  O
                </div>
              )}
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500">Total Amount</p>
              <p className="text-4xl font-extrabold">
                {formatCurrency(order.grand_total, order.currency)}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={`/orders/${order.id}/tracking`}
              className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white"
            >
              Track Order
            </Link>

            <Link
              href={`/orders/${order.id}`}
              className="rounded-lg bg-white px-6 py-3 font-bold text-emerald-700 shadow-sm"
            >
              View Detail
            </Link>

            <Link
              href="/products"
              className="rounded-lg bg-slate-300 px-6 py-3 font-bold text-slate-700"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      ) : null}

      {!loading && !error && !order ? (
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/orders"
            className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white"
          >
            View Orders
          </Link>

          <Link
            href="/products"
            className="rounded-lg bg-slate-300 px-6 py-3 font-bold text-slate-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl py-8 text-center">
          <div className="rounded-xl bg-white p-6 text-slate-500 shadow-sm">
            Loading order success page...
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}