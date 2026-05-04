import type { FormEvent } from "react";
import type { Cart } from "@/domains/cart/types";
import type { CreateOrderPayload } from "@/domains/order/types";

export type ShippingAddress = CreateOrderPayload["shipping_address"];
export type PaymentMethod = CreateOrderPayload["payment_method"];

export type CheckoutSummaryItem = {
  id: string;
  product_id: string;
  product_name: string;
  image_url?: string;
  variant?: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type CheckoutSummary = {
  items: CheckoutSummaryItem[];
  totalQuantity: number;
  subtotal: number;
  shipping: number;
  estimatedTax: number;
  grandTotal: number;
};

export type ValidationErrors = Record<string, string[]> | null;

export type CheckoutViewProps = {
  form: CreateOrderPayload;
  summary: CheckoutSummary;
  cartLoading: boolean;
  creatingOrder: boolean;
  error: string | null;
  validationErrors: ValidationErrors;
  isCartEmpty: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onShippingAddressChange: (key: keyof ShippingAddress, value: string) => void;
  onPaymentMethodChange: (value: PaymentMethod) => void;
  onNotesChange: (value: string) => void;
};

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

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object") {
    return value as Record<string, unknown>;
  }

  return {};
}

function getString(value: unknown, fallback = ""): string {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return fallback;
}

function getCartItems(cart: Cart | null | undefined): unknown[] {
  if (!cart) {
    return [];
  }

  const cartRecord = cart as Record<string, unknown>;
  const items = cartRecord.items;

  if (!Array.isArray(items)) {
    return [];
  }

  return items;
}

function normalizeCartItem(item: unknown, index: number): CheckoutSummaryItem {
  const current = getRecord(item);
  const product = getRecord(current.product);

  const price = toNumber(current.price ?? product.price);
  const quantity = toNumber(current.quantity, 1);
  const subtotal = toNumber(current.subtotal, price * quantity);

  return {
    id: getString(current.id, `cart-item-${index + 1}`),
    product_id: getString(
      current.product_id ?? product.id,
      getString(current.id, `product-${index + 1}`)
    ),
    product_name: getString(
      current.product_name ?? current.name ?? product.name,
      `Produk ${index + 1}`
    ),
    image_url: getString(current.image_url ?? current.imageUrl ?? product.image_url),
    variant: getString(current.variant ?? product.variant),
    price,
    quantity,
    subtotal,
  };
}

export function buildCartSummary(cart: Cart | null | undefined): CheckoutSummary {
  const items = getCartItems(cart).map(normalizeCartItem);

  const totalQuantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const subtotal = items.reduce((total, item) => {
    return total + item.subtotal;
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