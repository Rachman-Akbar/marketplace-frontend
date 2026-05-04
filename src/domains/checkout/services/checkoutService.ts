import { api, getAxiosErrorMessage } from "@/lib/axios";
import type { Cart } from "@/domains/cart/types";
import type {
  CheckoutResponse,
  CheckoutSummary,
  CheckoutSummaryItem,
  CreateOrderPayload,
} from "@/domains/checkout/types";

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

  if (typeof value === "number") {
    return String(value);
  }

  return fallback;
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
      getString(current.id, `product-${index + 1}`),
    ),
    product_name: getString(
      current.product_name ?? current.name ?? product.name,
      `Produk ${index + 1}`,
    ),
    image_url: getString(
      current.product_image ??
        current.image_url ??
        current.imageUrl ??
        product.image_url,
    ),
    variant: getString(current.variant ?? product.variant),
    price,
    quantity,
    subtotal,
  };
}

export function buildCartSummary(cart: Cart | null | undefined): CheckoutSummary {
  const items = Array.isArray(cart?.items)
    ? cart.items.map(normalizeCartItem)
    : [];

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

export async function createCheckout(
  payload: CreateOrderPayload,
): Promise<CheckoutResponse> {
  try {
    const response = await api.post<CheckoutResponse>("/checkout", payload, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(getAxiosErrorMessage(error, "Checkout gagal."));
  }
}