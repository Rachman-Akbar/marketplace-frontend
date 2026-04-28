'use client';

import {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '@/lib/cart/cartApiService';
import type { Cart } from '@/types/cart';
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type CartContextValue = {
  cart: Cart | null;
  loading: boolean;
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
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (action: () => Promise<Cart>) => {
    try {
      setLoading(true);
      setError(null);

      const result = await action();
      setCart(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Terjadi kesalahan cart.';

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCart = useCallback(async () => {
    await run(getCart);
  }, [run]);

  const addItem = useCallback(
    async (productId: number, quantity = 1) => {
      await run(() =>
        addCartItem({
          product_id: productId,
          quantity,
        })
      );
    },
    [run]
  );

  const updateItem = useCallback(
    async (productId: number, quantity: number) => {
      await run(() =>
        updateCartItem(productId, {
          quantity,
        })
      );
    },
    [run]
  );

  const removeItem = useCallback(
    async (productId: number) => {
      await run(() => removeCartItem(productId));
    },
    [run]
  );

  const clear = useCallback(async () => {
    await run(clearCart);
  }, [run]);

  const value = useMemo(
    () => ({
      cart,
      loading,
      error,
      fetchCart,
      addItem,
      updateItem,
      removeItem,
      clear,
    }),
    [cart, loading, error, fetchCart, addItem, updateItem, removeItem, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}