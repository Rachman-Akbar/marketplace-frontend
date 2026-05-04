"use client";

import Link from "next/link";

import { useCart } from "../hooks/useCart";
import { CartItemRow } from "./cart-item-row";
import { CartSummaryCard } from "./cart-summary-card";

export function CartClient() {
  const {
    cart,
    loading,
    pendingProductId,
    error,
    fetchCart,
    updateItem,
    removeItem,
    clear,
  } = useCart();

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
    const confirmed = window.confirm("Hapus produk ini dari cart?");
    if (!confirmed) return;

    await removeItem(productId);
  }

  async function handleClearCart() {
    const confirmed = window.confirm("Kosongkan semua cart?");
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
          onClick={() => {
            void fetchCart();
          }}
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

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <section className="space-y-5 lg:col-span-8">
        {error ? (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {cart.items.map((item) => {
          const disabled = pendingProductId === item.product_id;

          return (
            <CartItemRow
              key={item.id}
              item={item}
              disabled={disabled}
              onDecrease={() =>
                handleDecrease(item.product_id, item.quantity)
              }
              onIncrease={() =>
                handleIncrease(item.product_id, item.quantity)
              }
              onRemove={() => handleRemove(item.product_id)}
            />
          );
        })}

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

      <CartSummaryCard cart={cart} />
    </div>
  );
}