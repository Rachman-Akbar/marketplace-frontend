'use client';

import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

type AddToCartButtonProps = {
  productId: number;
  quantity?: number;
  className?: string;
};

export function AddToCartButton({
  productId,
  quantity = 1,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    try {
      setLoading(true);
      await addItem(productId, quantity);
      alert('Produk berhasil ditambahkan ke cart.');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Gagal menambahkan produk.';

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={loading}
      className={
        className ??
        'rounded-lg bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50'
      }
    >
      {loading ? 'Menambahkan...' : 'Tambah ke Cart'}
    </button>
  );
}