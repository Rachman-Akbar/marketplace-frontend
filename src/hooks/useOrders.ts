"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/orderApiService";
import { GetOrdersParams, Order, OrdersResponse } from "@/types/order";

export function useOrders(initialParams?: GetOrdersParams) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [meta, setMeta] = useState<OrdersResponse["meta"]>();
  const [params, setParams] = useState<GetOrdersParams>(
    initialParams ?? {
      page: 1,
      per_page: 10,
    },
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchOrders(nextParams?: GetOrdersParams) {
    try {
      setLoading(true);
      setError("");

      const finalParams = {
        ...params,
        ...nextParams,
      };

      const response = await getOrders(finalParams);

      setOrders(response.data ?? []);
      setMeta(response.meta);
      setParams(finalParams);
    } catch (err: any) {
      setError(err.message ?? "Gagal mengambil data order");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    orders,
    meta,
    params,
    loading,
    error,
    fetchOrders,
  };
}