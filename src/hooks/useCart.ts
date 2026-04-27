'use client';

import { CartContext } from '@/context/CartContext';
import { useContext } from 'react';

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart harus digunakan di dalam CartProvider.');
  }

  return context;
}