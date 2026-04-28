import {api} from "@/lib/axios";
import {
  CancelOrderPayload,
  CreateOrderPayload,
  GetOrdersParams,
  OrderDetailResponse,
  OrdersResponse,
} from "@/types/order";

export async function getOrders(
  params?: GetOrdersParams,
): Promise<OrdersResponse> {
  const response = await api.get<OrdersResponse>("/orders", {
    params,
  });

  return response.data;
}

export async function getOrderDetail(
  orderId: number | string,
): Promise<OrderDetailResponse> {
  const response = await api.get<OrderDetailResponse>(`/orders/${orderId}`);

  return response.data;
}

export async function createOrder(
  payload: CreateOrderPayload,
): Promise<OrderDetailResponse> {
  const response = await api.post<OrderDetailResponse>("/orders", payload);

  return response.data;
}

export async function cancelOrder(
  orderId: number | string,
  payload: CancelOrderPayload,
): Promise<OrderDetailResponse> {
  const response = await api.post<OrderDetailResponse>(
    `/orders/${orderId}/cancel`,
    payload,
  );

  return response.data;
}