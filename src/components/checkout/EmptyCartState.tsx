import Link from "next/link";

export function EmptyCartState() {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <h2 className="text-3xl font-extrabold text-slate-900">
        Cart kamu masih kosong
      </h2>

      <p className="mt-2 text-slate-500">
        Tambahkan produk terlebih dahulu sebelum checkout.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800"
      >
        Continue Browsing
      </Link>
    </div>
  );
}