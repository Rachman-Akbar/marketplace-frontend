'use client';

import { useCart } from '@/hooks/useCart';

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function CartSummary() {
  const { cart, clear, loading } = useCart();

  if (!cart) return null;

  async function handleClear() {
    const confirmed = confirm('Kosongkan cart?');

    if (!confirmed) return;

    await clear();
  }

  return (
    <aside className="rounded-xl border p-4">
      <h2 className="mb-4 text-lg font-semibold">Ringkasan Belanja</h2>

      <div className="mb-2 flex justify-between text-sm">
        <span>Total Item</span>
        <span>{cart.total_quantity}</span>
      </div>

      <div className="mb-4 flex justify-between font-semibold">
        <span>Total Harga</span>
        <span>{formatRupiah(cart.total_price)}</span>
      </div>

      <button
        type="button"
        disabled={!cart.items.length || loading}
        className="mb-2 w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        Checkout
      </button>

      <button
        type="button"
        onClick={handleClear}
        disabled={!cart.items.length || loading}
        className="w-full rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        Kosongkan Cart
      </button>
    </aside>
  );
}