"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">
        ✓
      </div>

      <h1 className="mt-6 text-4xl font-extrabold">
        Order berhasil dibuat
      </h1>

      <p className="mt-3 text-slate-500">
        Terima kasih. Pesanan kamu sudah masuk ke sistem.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        {orderNumber ? (
          <Link
            href={`/orders/${encodeURIComponent(orderNumber)}`}
            className="rounded-lg bg-emerald-700 px-5 py-3 font-bold text-white"
          >
            Lihat Detail Order
          </Link>
        ) : null}

        <Link
          href="/orders"
          className="rounded-lg bg-slate-200 px-5 py-3 font-bold text-slate-700"
        >
          Lihat Semua Orders
        </Link>
      </div>
    </div>
  );
}