import type { FormEvent } from "react";
import type { CreateOrderPayload } from "@/types/order";
import type {
  CheckoutSummary,
  PaymentMethod,
  ShippingAddress,
} from "@/lib/checkout/checkout";

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