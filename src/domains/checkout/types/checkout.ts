import type { Cart } from "@/domains/cart/types";
import type { CreateOrderPayload } from "@/domains/order/types";

export type ShippingAddress = CreateOrderPayload["shipping_address"];
export type PaymentMethod = CreateOrderPayload["payment_method"];

export const INITIAL_CHECKOUT_FORM: CreateOrderPayload = {
  shipping_address: {
    recipient_name: "",
    phone: "",
    address_line: "",
    province: "",
    city: "",
    district: "",
    postal_code: "",
    notes: "",
  },
  payment_method: "manual_transfer",
  notes: "",
};

export function createInitialCheckoutForm(): CreateOrderPayload {
  return {
    shipping_address: {
      ...INITIAL_CHECKOUT_FORM.shipping_address,
    },
    payment_method: INITIAL_CHECKOUT_FORM.payment_method,
    notes: INITIAL_CHECKOUT_FORM.notes,
  };
}

export function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return fallback;
  }

  const cleaned = value.replace(/[^\d.,-]/g, "").trim();

  if (!cleaned) {
    return fallback;
  }

  const lastDot = cleaned.lastIndexOf(".");
  const lastComma = cleaned.lastIndexOf(",");

  let normalized = cleaned;

  if (lastDot !== -1 && lastComma !== -1) {
    normalized =
      lastComma > lastDot
        ? cleaned.replace(/\./g, "").replace(",", ".")
        : cleaned.replace(/,/g, "");
  } else if (lastComma !== -1) {
    normalized = cleaned.replace(",", ".");
  } else if (lastDot !== -1) {
    const decimalPart = cleaned.slice(lastDot + 1);

    if (decimalPart.length === 3) {
      normalized = cleaned.replace(/\./g, "");
    }
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : fallback;
}

export function formatPrice(value: unknown): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(toNumber(value));
}

export function buildCartSummary(cart: Cart | null) {
  const items = cart?.items ?? [];

  const totalQuantity = items.reduce((total, item) => {
    return total + toNumber(item.quantity);
  }, 0);

  const subtotal = items.reduce((total, item) => {
    const price = toNumber(item.price);
    const quantity = toNumber(item.quantity);
    const itemSubtotal = toNumber(item.subtotal, price * quantity);

    return total + itemSubtotal;
  }, 0);

  const shipping = 0;
  const estimatedTax = 0;
  const grandTotal = subtotal + shipping + estimatedTax;

  return {
    items,
    totalQuantity,
    subtotal,
    shipping,
    estimatedTax,
    grandTotal,
  };
}

export type CheckoutSummary = ReturnType<typeof buildCartSummary>;