"use client";

import { useState } from "react";
import type { Product } from "../../types";

type ProductPurchaseCardProps = {
  product: Product;
};

export function ProductPurchaseCard({ product }: ProductPurchaseCardProps) {
  const stock = Number(product.stock ?? 0);
  const [quantity, setQuantity] = useState(1);

  const safeQuantity = Math.max(1, Math.min(quantity, Math.max(stock, 1)));
  const subtotal = Number(product.price) * safeQuantity;

  return (
    <aside className="h-fit rounded-2xl border bg-white p-5 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold">Atur jumlah dan catatan</h2>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-gray-500">Jumlah</span>

        <div className="flex items-center overflow-hidden rounded-xl border">
          <button
            type="button"
            className="px-4 py-2"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          >
            -
          </button>

          <span className="min-w-12 text-center">{safeQuantity}</span>

          <button
            type="button"
            className="px-4 py-2"
            onClick={() =>
              setQuantity((value) => Math.min(Math.max(stock, 1), value + 1))
            }
          >
            +
          </button>
        </div>
      </div>

      <p className="mt-2 text-right text-sm text-gray-500">
        Stok: {stock}
      </p>

      <div className="mt-5 border-t pt-5">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Subtotal</span>
          <strong className="text-2xl">
            Rp{subtotal.toLocaleString("id-ID")}
          </strong>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <button
          type="button"
          className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          + Keranjang
        </button>

        <button
          type="button"
          className="w-full rounded-xl border border-emerald-600 px-4 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
        >
          Beli Langsung
        </button>
      </div>

      <div className="mt-5 flex justify-between text-sm text-gray-500">
        <button type="button">Chat</button>
        <button type="button">Wishlist</button>
        <button type="button">Share</button>
      </div>
    </aside>
  );
}