"use client";

import Link from "next/link";
import { useOrders } from "@/hooks/useOrders";
import { formatCurrency, formatDate, getOrderItems } from "@/lib/ordering/orderUtils";
import { OrderStatus } from "@/types/order";
import OrderStatusBadge from "@/components/ordering/OrderStatusBadge";

const filters: Array<{ label: string; value: OrderStatus | "" }> = [
  { label: "All Orders", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

export default function OrdersPage() {
  const { orders, meta, params, loading, error, fetchOrders } = useOrders({
    page: 1,
    per_page: 10,
  });

  function handleFilter(status: OrderStatus | "") {
    fetchOrders({
      status,
      page: 1,
    });
  }

  function handleNextPage() {
    if (!meta || meta.current_page >= meta.last_page) return;

    fetchOrders({
      page: meta.current_page + 1,
    });
  }

  function handlePreviousPage() {
    if (!meta || meta.current_page <= 1) return;

    fetchOrders({
      page: meta.current_page - 1,
    });
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight">
          Order History
        </h1>
        <p className="mt-2 max-w-2xl text-slate-500">
          Review your past acquisitions and track currently active shipments.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active = (params.status ?? "") === filter.value;

          return (
            <button
              key={filter.label}
              type="button"
              onClick={() => handleFilter(filter.value)}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                active
                  ? "bg-emerald-200 text-emerald-900"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-sm">
          Loading orders...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          {error}
        </div>
      ) : null}

      {!loading && !error && orders.length === 0 ? (
        <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow-sm">
          Belum ada order.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {orders.map((order) => {
          const items = getOrderItems(order);
          const firstItem = items[0];

          return (
            <div key={order.id} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-3xl font-extrabold text-emerald-700">
                  {firstItem?.product_name?.charAt(0)?.toUpperCase() ?? "O"}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">
                        Order #{order.order_number}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Placed on {formatDate(order.created_at)}
                      </p>
                    </div>

                    <OrderStatusBadge status={order.status} />
                  </div>

                  <p className="mt-3 text-sm text-slate-500">
                    {firstItem
                      ? `${firstItem.product_name}${
                          items.length > 1
                            ? ` + ${items.length - 1} item lain`
                            : ""
                        }`
                      : "Order item"}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                    <p className="text-3xl font-bold text-emerald-700">
                      {formatCurrency(order.grand_total, order.currency)}
                    </p>

                    <Link
                      href={`/orders/${order.id}`}
                      className="font-bold text-emerald-700"
                    >
                      View Detail
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {meta ? (
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={meta.current_page <= 1}
            onClick={handlePreviousPage}
            className="rounded-lg bg-slate-200 px-6 py-3 font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <p className="text-sm font-semibold text-slate-500">
            Page {meta.current_page} of {meta.last_page}
          </p>

          <button
            type="button"
            disabled={meta.current_page >= meta.last_page}
            onClick={handleNextPage}
            className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}