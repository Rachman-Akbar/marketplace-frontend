'use client';

import { useCart } from '@/hooks/useCart';
import type { CartItem } from '@/types/cart';

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function CartItemRow({ item }: { item: CartItem }) {
  const { updateItem, removeItem, loading } = useCart();

  async function decrease() {
    if (item.quantity <= 1) {
      await removeItem(item.product_id);
      return;
    }

    await updateItem(item.product_id, item.quantity - 1);
  }

  async function increase() {
    await updateItem(item.product_id, item.quantity + 1);
  }

  async function remove() {
    const confirmed = confirm('Hapus produk ini dari cart?');

    if (!confirmed) return;

    await removeItem(item.product_id);
  }

  return (
    <div className="flex gap-4 border-b py-4">
      <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
        {item.product_image ? (
          <img
            src={item.product_image}
            alt={item.product_name}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex justify-between gap-4">
          <div>
            <h3 className="font-medium">{item.product_name}</h3>
            <p className="text-sm text-gray-500">{formatRupiah(item.price)}</p>
          </div>

          <p className="font-semibold">{formatRupiah(item.subtotal)}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-lg border">
            <button
              type="button"
              onClick={decrease}
              disabled={loading}
              className="px-3 py-1 disabled:opacity-50"
            >
              -
            </button>

            <span className="min-w-8 text-center">{item.quantity}</span>

            <button
              type="button"
              onClick={increase}
              disabled={loading}
              className="px-3 py-1 disabled:opacity-50"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={remove}
            disabled={loading}
            className="text-sm text-red-600 disabled:opacity-50"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}