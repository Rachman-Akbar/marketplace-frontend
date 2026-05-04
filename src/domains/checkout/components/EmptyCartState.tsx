export function EmptyCartState() {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
      <h2 className="text-xl font-semibold text-slate-950">Keranjang kosong</h2>
      <p className="mt-2 text-sm text-slate-500">
        Tambahkan produk ke keranjang sebelum melanjutkan checkout.
      </p>
    </div>
  );
}
