"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getOrders } from "../services/orderService";
import type { Order, OrdersMeta, OrdersQuery } from "../types";

const DEFAULT_PARAMS: OrdersQuery = {
  page: 1,
  per_page: 10,
};

export function useOrders(initialParams: OrdersQuery = DEFAULT_PARAMS) {
  const initialParamsRef = useRef<OrdersQuery>({
    ...DEFAULT_PARAMS,
    ...initialParams,
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<OrdersMeta | null>(null);
  const [params, setParams] = useState<OrdersQuery>(initialParamsRef.current);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async (nextParams: OrdersQuery) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getOrders(nextParams);

      setOrders(response.data);
      setMeta(response.meta ?? null);
      setParams(nextParams);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Gagal memuat orders.",
      );
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(
    async (overrides: OrdersQuery = {}) => {
      const nextParams = {
        ...params,
        ...overrides,
      };

      await loadOrders(nextParams);
    },
    [loadOrders, params],
  );

  useEffect(() => {
    void loadOrders(initialParamsRef.current);
  }, [loadOrders]);

  return {
    orders,
    meta,
    params,
    loading,
    initialLoading,
    error,
    fetchOrders,
  };
}