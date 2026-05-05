export function CheckoutHeader() {
  return (
    <header className="mb-5">
      <a
        href="/cart"
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <span aria-hidden="true">←</span>
        Kembali ke Keranjang
      </a>

      <h1 className="text-3xl font-black tracking-tight text-slate-950">
        Checkout
      </h1>
    </header>
  );
}