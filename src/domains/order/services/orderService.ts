import { api, getAxiosErrorMessage } from "@/lib/axios";

import type {
  CancelOrderPayload,
  Order,
  OrderResponse,
  OrdersQuery,
  OrdersResponse,
} from "../types";

function cleanParams(params: OrdersQuery): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;

    result[key] = String(value);
  }

  return result;
}

export async function getOrders(
  params: OrdersQuery = {},
): Promise<OrdersResponse> {
  try {
    const response = await api.get<OrdersResponse>("/orders", {
      params: cleanParams(params),
    });

    return {
      data: response.data.data ?? [],
      meta: response.data.meta,
    };
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error, "Gagal memuat orders."));
  }
}

export async function getOrderDetail(identifier: string): Promise<Order> {
  try {
    const response = await api.get<OrderResponse>(
      `/orders/${encodeURIComponent(identifier)}`,
    );

    return response.data.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error, "Gagal memuat detail order."));
  }
}

export async function cancelOrder(
  identifier: string,
  payload: CancelOrderPayload = {},
): Promise<Order> {
  try {
    const response = await api.post<OrderResponse>(
      `/orders/${encodeURIComponent(identifier)}/cancel`,
      payload,
    );

    return response.data.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error, "Gagal membatalkan order."));
  }
}