import type { Order, OrderItem, OrderStatus } from "../types";

export function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value !== "string") return fallback;

  const parsed = Number(value.replace(/[^\d.-]/g, ""));

  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeCurrency(currency?: string | null): string {
  const value = typeof currency === "string" ? currency.trim().toUpperCase() : "";

  if (!value) {
    return "IDR";
  }

  try {
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: value,
    }).format(0);

    return value;
  } catch {
    return "IDR";
  }
}

export function formatCurrency(
  value: unknown,
  currency?: string | null,
): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: normalizeCurrency(currency),
    maximumFractionDigits: 0,
  }).format(toNumber(value));
}

export function formatDate(value?: string | null): string {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function getOrderItems(order: Order): OrderItem[] {
  return Array.isArray(order.items) ? order.items : [];
}

export function getOrderDetailRoute(order: Order): string {
  return `/orders/${encodeURIComponent(order.order_number || String(order.id))}`;
}

export function getOrderTrackingRoute(order: Order): string {
  return `/orders/${encodeURIComponent(order.order_number || String(order.id))}/tracking`;
}

export function canCancelOrder(status: OrderStatus): boolean {
  return status === "pending" || status === "confirmed";
}