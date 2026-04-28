"use client";

import { useEffect, useState } from "react";
import { getOrderDetail } from "@/lib/ordering/orderApiService";
import { Order } from "@/types/order";

export function useOrderDetail(orderId?: number | string | null) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(Boolean(orderId));
  const [error, setError] = useState("");

  async function fetchOrder(targetOrderId?: number | string | null) {
    const finalOrderId = targetOrderId ?? orderId;

    if (!finalOrderId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getOrderDetail(finalOrderId);

      setOrder(response.data);
    } catch (err: any) {
      setError(err.message ?? "Gagal mengambil detail order");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrder(orderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return {
    order,
    loading,
    error,
    fetchOrder,
  };
}