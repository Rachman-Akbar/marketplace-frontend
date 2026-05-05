"use client";

import { useSearchParams, useRouter } from "next/navigation";

const STATE_MESSAGE: Record<string, { title: string; body: string }> = {
  pending: {
    title: "Menunggu pembayaran",
    body: "Instruksi pembayaran sudah dibuat. Selesaikan pembayaran melalui VA, QRIS, atau metode yang kamu pilih di Midtrans.",
  },
  success: {
    title: "Pembayaran sedang diverifikasi",
    body: "Kami sedang menunggu konfirmasi dari payment gateway. Status final akan diperbarui otomatis setelah webhook diterima.",
  },
  closed: {
    title: "Pembayaran belum selesai",
    body: "Kamu menutup halaman pembayaran sebelum menyelesaikan transaksi. Kamu bisa lanjutkan pembayaran dari detail order.",
  },
  error: {
    title: "Pembayaran gagal dibuka",
    body: "Terjadi masalah saat membuka pembayaran. Silakan coba lagi dari detail order.",
  },
  manual_review: {
    title: "Menunggu verifikasi transfer",
    body: "Bukti transfer sudah dikirim. Admin akan memverifikasi pembayaranmu.",
  },
  cod: {
    title: "Pesanan berhasil dibuat",
    body: "Pesanan berhasil dibuat dengan metode COD. Pembayaran dilakukan saat barang diterima.",
  },
};

export default function OrderPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const order = searchParams.get("order") ?? "";
  const state = searchParams.get("state") ?? "pending";
  const message = STATE_MESSAGE[state] ?? STATE_MESSAGE.pending;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center px-6 py-12">
      <section className="w-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Status Order
        </p>

        <h1 className="mt-3 text-2xl font-bold text-slate-950">
          {message.title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">{message.body}</p>

        {order ? (
          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Nomor Order
            </p>
            <p className="mt-1 font-semibold text-slate-950">{order}</p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push(order ? `/orders/${order}` : "/orders")}
            className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Lihat Detail Order
          </button>

          <button
            type="button"
            onClick={() => router.push("/orders")}
            className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50"
          >
            Daftar Pesanan
          </button>
        </div>
      </section>
    </main>
  );
}