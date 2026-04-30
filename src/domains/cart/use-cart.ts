"use client";

import { useCallback, useEffect, useState } from "react";
import {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "./api";
import type { Cart } from "./types";

type UseCartOptions = {
  autoFetch?: boolean;
};

export function useCart(options: UseCartOptions = {}) {
  const { autoFetch = true } = options;

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingProductId, setPendingProductId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const nextCart = await getCart();
      setCart(nextCart);
      return nextCart;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal memuat cart.";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(
    async (productId: number, quantity = 1) => {
      setPendingProductId(productId);
      setError(null);

      try {
        const nextCart = await addCartItem({
          product_id: productId,
          quantity,
        });

        setCart(nextCart);
        return nextCart;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Gagal menambahkan cart.";
        setError(message);
        throw error;
      } finally {
        setPendingProductId(null);
      }
    },
    [],
  );

  const updateItem = useCallback(async (productId: number, quantity: number) => {
    setPendingProductId(productId);
    setError(null);

    try {
      const nextCart = await updateCartItem(productId, { quantity });
      setCart(nextCart);
      return nextCart;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal mengubah cart.";
      setError(message);
      throw error;
    } finally {
      setPendingProductId(null);
    }
  }, []);

  const removeItem = useCallback(async (productId: number) => {
    setPendingProductId(productId);
    setError(null);

    try {
      const nextCart = await removeCartItem(productId);
      setCart(nextCart);
      return nextCart;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal menghapus item.";
      setError(message);
      throw error;
    } finally {
      setPendingProductId(null);
    }
  }, []);

  const clear = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const nextCart = await clearCart();
      setCart(nextCart);
      return nextCart;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal mengosongkan cart.";
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!autoFetch) return;

    fetchCart().catch(() => {});
  }, [autoFetch, fetchCart]);

  return {
    cart,
    loading,
    pendingProductId,
    error,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clear,
  };
}