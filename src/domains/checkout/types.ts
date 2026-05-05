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

export type PaymentMethod = "midtrans" | "manual_transfer" | "cod";

export type MidtransChannel =
  | "bca_va"
  | "bri_va"
  | "mandiri_va"
  | "bni_va"
  | "permata_va"
  | "shopeepay"
  | "gopay"
  | "ovo"
  | "dana"
  | "qris";

export type ManualTransferFormValue = {
  bank_destination: string;
  sender_account_name: string;
  sender_account_number: string;
  transfer_date: string;
  transfer_proof: File | null;
  admin_note: string;
};

export type CreateOrderPayload = {
  shipping_address: ShippingAddress;
  payment_method: PaymentMethod;
  midtrans_channel?: MidtransChannel | null;
  manual_transfer?: ManualTransferFormValue;
  notes?: string;
};

export type AddressOption = {
  id: string;
  label: string;
  recipient_name: string;
  phone: string;
  shipping_address: ShippingAddress;
  is_default?: boolean;
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

export type CheckoutPhase =
  | "idle"
  | "creating_order"
  | "creating_payment"
  | "opening_midtrans"
  | "waiting_payment"
  | "order_created"
  | "failed";

export type CheckoutViewProps = {
  form: CreateOrderPayload;
  summary: CheckoutSummary;
  cartLoading: boolean;
  creatingOrder: boolean;
  checkoutPhase: CheckoutPhase;
  createdOrder: Order | null;
  error: string | null;
  validationErrors: ValidationErrors;
  isCartEmpty: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onShippingAddressChange: (key: keyof ShippingAddress, value: string) => void;
  onPaymentMethodChange: (value: PaymentMethod) => void;
  onMidtransChannelChange: (value: MidtransChannel) => void;
  onManualTransferChange: (patch: Partial<ManualTransferFormValue>) => void;
  onNotesChange: (value: string) => void;
};