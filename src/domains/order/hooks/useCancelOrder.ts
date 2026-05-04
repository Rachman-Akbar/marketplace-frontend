"use client";

import { useState } from "react";

import { cancelOrder as cancelOrderApi } from "../services/orderService";
import type { CancelOrderPayload, Order } from "../types";

export function useCancelOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cancelOrder(
    identifier: string,
    payload: CancelOrderPayload = {},
  ): Promise<Order | null> {
    setLoading(true);
    setError(null);

    try {
      return await cancelOrderApi(identifier, payload);
    } catch (unknownError) {
      const message =
        unknownError instanceof Error
          ? unknownError.message
          : "Gagal membatalkan order.";

      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    cancelOrder,
    loading,
    error,
  };
}