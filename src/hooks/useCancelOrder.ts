"use client";

import { useState } from "react";
import { cancelOrder as cancelOrderApi } from "@/lib/orderApiService";
import { CancelOrderPayload, Order } from "@/types/order";

export function useCancelOrder() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function cancelOrder(
    orderId: number | string,
    payload: CancelOrderPayload,
  ): Promise<Order> {
    try {
      setLoading(true);
      setError("");

      const response = await cancelOrderApi(orderId, payload);

      setOrder(response.data);

      return response.data;
    } catch (err: any) {
      setError(err.message ?? "Gagal membatalkan order");

      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    order,
    loading,
    error,
    cancelOrder,
  };
}