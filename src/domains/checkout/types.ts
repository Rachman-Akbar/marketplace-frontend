import type { FormEvent } from "react";
import type { Order } from "@/domains/order/types";

export type ShippingAddress = {
  recipient_name: string;
  phone: string;
  address_line: string;
  province: string;
  city: string;
  district: string;
  postal_code: string;
  notes?: string;
  courier_note?: string;
};

export type PaymentMethod = "manual_transfer" | "cod" | "bank_transfer";

export type CreateOrderPayload = {
  shipping_address: ShippingAddress;
  payment_method: PaymentMethod;
  notes?: string;
};

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

export type CheckoutResponse = {
  message: string;
  data: Order;
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