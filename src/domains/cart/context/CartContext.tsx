"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "@/domains/auth/context/AuthContext";

import {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../api";

import type { Cart } from "../types";

type CartContextValue = {
  cart: Cart | null;
  loading: boolean;
  mutating: boolean;
  pendingProductId: number | null;
  error: string | null;
  fetchCart: () => Promise<Cart | null>;
  addItem: (productId: number, quantity?: number) => Promise<Cart>;
  updateItem: (productId: number, quantity: number) => Promise<Cart>;
  removeItem: (productId: number) => Promise<Cart>;
  clear: () => Promise<Cart>;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { firebaseUser, backendSession, isLoading: authLoading } = useAuth();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [pendingProductId, setPendingProductId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated =
    !!firebaseUser &&
    !!backendSession &&
    backendSession.user.firebase_uid === firebaseUser.uid;

  const handleError = useCallback((err: unknown, fallback: string) => {
    const message = err instanceof Error ? err.message : fallback;

    setError(message);
    throw err;
  }, []);

  const fetchCart = useCallback(async (): Promise<Cart | null> => {
    if (!isAuthenticated) {
      setCart(null);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const nextCart = await getCart();
      setCart(nextCart);
      return nextCart;
    } catch (err) {
      handleError(err, "Gagal memuat cart.");
    } finally {
      setLoading(false);
    }

    return null;
  }, [handleError, isAuthenticated]);

  const addItem = useCallback(
    async (productId: number, quantity = 1): Promise<Cart> => {
      if (!isAuthenticated) {
        throw new Error("Silakan login terlebih dahulu.");
      }

      setPendingProductId(productId);
      setMutating(true);
      setError(null);

      try {
        const nextCart = await addCartItem({
          product_id: productId,
          quantity,
        });

        setCart(nextCart);
        return nextCart;
      } catch (err) {
        handleError(err, "Gagal menambahkan cart.");
      } finally {
        setPendingProductId(null);
        setMutating(false);
      }

      throw new Error("Gagal menambahkan cart.");
    },
    [handleError, isAuthenticated],
  );

  const updateItem = useCallback(
    async (productId: number, quantity: number): Promise<Cart> => {
      if (!isAuthenticated) {
        throw new Error("Silakan login terlebih dahulu.");
      }

      setPendingProductId(productId);
      setMutating(true);
      setError(null);

      try {
        const nextCart = await updateCartItem(productId, { quantity });
        setCart(nextCart);
        return nextCart;
      } catch (err) {
        handleError(err, "Gagal mengubah cart.");
      } finally {
        setPendingProductId(null);
        setMutating(false);
      }

      throw new Error("Gagal mengubah cart.");
    },
    [handleError, isAuthenticated],
  );

  const removeItem = useCallback(
    async (productId: number): Promise<Cart> => {
      if (!isAuthenticated) {
        throw new Error("Silakan login terlebih dahulu.");
      }

      setPendingProductId(productId);
      setMutating(true);
      setError(null);

      try {
        const nextCart = await removeCartItem(productId);
        setCart(nextCart);
        return nextCart;
      } catch (err) {
        handleError(err, "Gagal menghapus item.");
      } finally {
        setPendingProductId(null);
        setMutating(false);
      }

      throw new Error("Gagal menghapus item.");
    },
    [handleError, isAuthenticated],
  );

  const clear = useCallback(async (): Promise<Cart> => {
    if (!isAuthenticated) {
      throw new Error("Silakan login terlebih dahulu.");
    }

    setLoading(true);
    setMutating(true);
    setError(null);

    try {
      const nextCart = await clearCart();
      setCart(nextCart);
      return nextCart;
    } catch (err) {
      handleError(err, "Gagal mengosongkan cart.");
    } finally {
      setLoading(false);
      setMutating(false);
    }

    throw new Error("Gagal mengosongkan cart.");
  }, [handleError, isAuthenticated]);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setCart(null);
      setError(null);
      setPendingProductId(null);
      return;
    }

    fetchCart().catch(() => {
      // Error sudah disimpan ke state.
    });
  }, [authLoading, isAuthenticated, fetchCart]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      loading,
      mutating,
      pendingProductId,
      error,
      fetchCart,
      addItem,
      updateItem,
      removeItem,
      clear,
    }),
    [
      cart,
      loading,
      mutating,
      pendingProductId,
      error,
      fetchCart,
      addItem,
      updateItem,
      removeItem,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}