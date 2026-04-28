"use client";

import { useState } from "react";
import { createOrder as createOrderApi } from "@/lib/orderApiService";
import { CreateOrderPayload, Order } from "@/types/order";

export function useCreateOrder() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  async function createOrder(payload: CreateOrderPayload): Promise<Order> {
    try {
      setLoading(true);
      setError("");
      setValidationErrors(null);

      const response = await createOrderApi(payload);

      setOrder(response.data);

      return response.data;
    } catch (err: any) {
      setError(err.message ?? "Gagal membuat order");
      setValidationErrors(err.errors ?? null);

      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    order,
    loading,
    error,
    validationErrors,
    createOrder,
  };
}