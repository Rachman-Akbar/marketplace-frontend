"use client";

import {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "@/lib/cart/cartApiService";
import type { Cart } from "@/types/cart";
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CartContextValue = {
  cart: Cart | null;
  loading: boolean;
  mutating: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clear: () => Promise<void>;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: unknown) => {
    const message =
      err instanceof Error ? err.message : "Terjadi kesalahan cart.";

    setError(message);
    throw err;
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getCart();
      setCart(result);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const runMutation = useCallback(
    async (action: () => Promise<Cart>) => {
      try {
        setMutating(true);
        setError(null);

        const result = await action();
        setCart(result);
      } catch (err) {
        handleError(err);
      } finally {
        setMutating(false);
      }
    },
    [handleError],
  );

  const addItem = useCallback(
    async (productId: number, quantity = 1) => {
      await runMutation(() =>
        addCartItem({
          product_id: productId,
          quantity,
        }),
      );
    },
    [runMutation],
  );

  const updateItem = useCallback(
    async (productId: number, quantity: number) => {
      await runMutation(() =>
        updateCartItem(productId, {
          quantity,
        }),
      );
    },
    [runMutation],
  );

  const removeItem = useCallback(
    async (productId: number) => {
      await runMutation(() => removeCartItem(productId));
    },
    [runMutation],
  );

  const clear = useCallback(async () => {
    await runMutation(clearCart);
  }, [runMutation]);

  const value = useMemo(
    () => ({
      cart,
      loading,
      mutating,
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