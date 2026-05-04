"use client";

import { useCallback, useEffect, useState } from "react";

import { getOrderDetail } from "../services/orderService";
import type { Order } from "../types";

export function useOrderDetail(identifier: string | null) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async () => {
    if (!identifier) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getOrderDetail(identifier);
      setOrder(result);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Gagal memuat detail order.",
      );
    } finally {
      setLoading(false);
    }
  }, [identifier]);

  useEffect(() => {
    void fetchOrder();
  }, [fetchOrder]);

  return {
    order,
    loading,
    error,
    fetchOrder,
    setOrder,
  };
}