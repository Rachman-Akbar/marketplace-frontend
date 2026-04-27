'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartPage() {
  const {
    cart,
    loading,
    error,
    fetchCart,
    updateItem,
    removeItem,
    clear,
  } = useCart();

  useEffect(() => {
    fetchCart().catch(() => {});
  }, [fetchCart]);

  async function handleDecrease(productId: number, quantity: number) {
    if (quantity <= 1) {
      await removeItem(productId);
      return;
    }

    await updateItem(productId, quantity - 1);
  }

  async function handleIncrease(productId: number, quantity: number) {
    await updateItem(productId, quantity + 1);
  }

  async function handleRemove(productId: number) {
    const confirmed = confirm('Hapus produk ini dari cart?');

    if (!confirmed) return;

    await removeItem(productId);
  }

  async function handleClearCart() {
    const confirmed = confirm('Kosongkan semua cart?');

    if (!confirmed) return;

    await clear();
  }

  if (loading && !cart) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-slate-600">Memuat cart...</p>
      </div>
    );
  }

  if (error && !cart) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="mb-4 text-red-600">{error}</p>

        <button
          type="button"
          onClick={fetchCart}
          className="rounded-lg bg-emerald-700 px-5 py-2 font-semibold text-white"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <h1 className="text-4xl font-extrabold tracking-tight">Cart</h1>

        <p className="mt-3 text-slate-500">Cart kamu masih kosong.</p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-emerald-700 px-5 py-3 font-bold text-white"
        >
          Continue Browsing The Gallery
        </Link>
      </div>
    );
  }

  const subtotal = cart.total_price;
  const shipping = 0;
  const estimatedTax = Math.round(subtotal * 0.08);
  const grandTotal = subtotal + shipping + estimatedTax;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <section className="space-y-5 lg:col-span-8">
        {error ? (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {cart.items.map((item) => (
          <div key={item.id} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="h-28 w-28 overflow-hidden rounded-lg bg-slate-100">
                {item.product_image ? (
                  <img
                    className="h-full w-full object-cover"
                    src={item.product_image}
                    alt={item.product_name}
                  />
                ) : null}
              </div>

              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                  Cart Item
                </p>

                <h3 className="text-2xl font-bold tracking-tight">
                  {item.product_name}
                </h3>

                <p className="text-sm text-slate-500">
                  Harga satuan: {formatPrice(item.price)}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center overflow-hidden rounded-lg border">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        handleDecrease(item.product_id, item.quantity)
                      }
                      className="px-3 py-1 font-bold disabled:opacity-50"
                    >
                      -
                    </button>

                    <span className="min-w-10 text-center">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        handleIncrease(item.product_id, item.quantity)
                      }
                      className="px-3 py-1 font-bold disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => handleRemove(item.product_id)}
                    className="text-sm font-semibold text-red-600 disabled:opacity-50"
                  >
                    Hapus
                  </button>
                </div>
              </div>

              <p className="text-3xl font-bold">
                {formatPrice(item.subtotal)}
              </p>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="mt-3 flex items-center gap-2 font-semibold text-emerald-700"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Continue Browsing The Gallery
          </Link>

          <button
            type="button"
            disabled={loading}
            onClick={handleClearCart}
            className="mt-3 font-semibold text-red-600 disabled:opacity-50"
          >
            Kosongkan Cart
          </button>
        </div>
      </section>

      <aside className="h-fit rounded-xl bg-slate-300/40 p-8 lg:col-span-4">
        <h2 className="text-4xl font-extrabold tracking-tight">
          Order Summary
        </h2>

        <div className="mt-5 space-y-2 text-slate-600">
          <div className="flex justify-between">
            <span>Total Item</span>
            <span>{cart.total_quantity}</span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-bold text-emerald-700">Complimentary</span>
          </div>

          <div className="flex justify-between">
            <span>Estimated Tax</span>
            <span>{formatPrice(estimatedTax)}</span>
          </div>
        </div>

        <div className="mt-5 text-5xl font-extrabold text-emerald-700">
          {formatPrice(grandTotal)}
        </div>

        <div className="mt-5 flex gap-2">
          <input
            suppressHydrationWarning
            className="w-full rounded-lg bg-white px-3 py-2"
            placeholder="CANVAS20"
          />

          <button
            suppressHydrationWarning
            type="button"
            className="rounded-lg bg-slate-600 px-4 py-2 font-bold text-white"
          >
            Apply
          </button>
        </div>

        <button
          suppressHydrationWarning
          type="button"
          className="mt-5 w-full rounded-lg bg-emerald-700 py-3 font-bold text-white"
        >
          Proceed to Checkout
        </button>
      </aside>
    </div>
  );
}