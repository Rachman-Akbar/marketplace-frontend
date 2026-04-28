import { MoneyValue, Order, OrderItem, OrderStatusHistory, ShippingAddress } from "@/types/order";

export function toNumber(value: MoneyValue | null | undefined): number {
  return Number(value ?? 0);
}

export function formatCurrency(value: MoneyValue, currency = "IDR"): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(toNumber(value));
}

export function formatDate(value?: string | null): string {
  if (!value) return "-";

  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function resolveShippingAddress(
  value: Order["shipping_address"],
): ShippingAddress {
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as ShippingAddress;
    } catch {
      return {
        recipient_name: "-",
        phone: "-",
        address_line: value,
        province: "-",
        city: "-",
        district: "-",
        postal_code: "-",
        notes: null,
      };
    }
  }

  return value;
}

export function getOrderItems(order: Order): OrderItem[] {
  return order.items ?? order.order_items ?? [];
}

export function getOrderHistories(order: Order): OrderStatusHistory[] {
  return order.histories ?? order.status_histories ?? [];
}