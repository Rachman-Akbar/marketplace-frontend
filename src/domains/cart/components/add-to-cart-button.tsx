"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/domains/auth/context/AuthContext";
import { useCart } from "@/domains/cart/hooks/useCart";

type AddToCartButtonProps = {
  productId: number;
  quantity?: number;
  stock?: number | string | null;
};

export function AddToCartButton({
  productId,
  quantity = 1,
  stock,
}: AddToCartButtonProps) {
  const router = useRouter();

  const { firebaseUser, backendSession, isLoading } = useAuth();
  const { addItem, pendingProductId } = useCart();

  const [success, setSuccess] = useState(false);

  const numericStock = Number(stock ?? 0);
  const isPending = pendingProductId === productId;
  const isOutOfStock = numericStock <= 0;

  const isLoggedIn =
    !!firebaseUser &&
    !!backendSession &&
    backendSession.user.firebase_uid === firebaseUser.uid;

  async function handleAddToCart() {
    if (isLoading) return;

    if (!isLoggedIn) {
      window.alert("Silakan login terlebih dahulu untuk menambahkan produk ke cart.");
      router.push("/login");
      return;
    }

    try {
      setSuccess(false);

      await addItem(productId, quantity);

      setSuccess(true);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal menambahkan produk ke cart.";

      window.alert(message);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={isLoading || isPending || isOutOfStock}
        onClick={handleAddToCart}
        className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? "Menambahkan..."
          : isOutOfStock
            ? "Stok Habis"
            : "Add to Cart"}
      </button>

      {success ? (
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="w-full text-sm font-semibold text-emerald-700"
        >
          Berhasil ditambahkan. Lihat cart
        </button>
      ) : null}
    </div>
  );
}