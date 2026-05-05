"use client";

import type { CheckoutViewProps } from "../types";
import {
  DEFAULT_MANUAL_TRANSFER_FORM,
} from "@/domains/checkout/constants";
import type {
  ManualTransferFormValue,
  MidtransChannel,
} from "@/domains/checkout/types";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutHeader } from "./CheckoutHeader";
import { EmptyCartState } from "./EmptyCartState";
import { ManualTransferForm } from "./ManualTransferForm";
import { OrderSummary } from "./OrderSummary";
import { PaymentMethodSelector } from "./PaymentMethodSelector";

type ExtendedCheckoutViewProps = CheckoutViewProps & {
  onMidtransChannelChange: (value: MidtransChannel) => void;
  onManualTransferChange: (patch: Partial<ManualTransferFormValue>) => void;
};

export function CheckoutView({
  form,
  summary,
  cartLoading,
  creatingOrder,
  error,
  validationErrors,
  isCartEmpty,
  onSubmit,
  onShippingAddressChange,
  onPaymentMethodChange,
  onMidtransChannelChange,
  onManualTransferChange,
  onNotesChange,
}: ExtendedCheckoutViewProps) {
  if (cartLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 h-12 w-12 animate-pulse rounded-full bg-emerald-100" />
          <p className="text-base font-bold text-slate-900">
            Memuat keranjang...
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Mohon tunggu sebentar, detail checkout sedang disiapkan.
          </p>
        </div>
      </div>
    );
  }

  if (isCartEmpty) {
    return (
      <div className="mx-auto max-w-3xl">
        <EmptyCartState />
      </div>
    );
  }

  const extendedForm = form as typeof form & {
    payment_method: "midtrans" | "manual_transfer" | "cod";
    midtrans_channel?: MidtransChannel | null;
    manual_transfer?: ManualTransferFormValue;
  };

  const manualTransfer =
    extendedForm.manual_transfer ?? DEFAULT_MANUAL_TRANSFER_FORM;

  return (
    <>
      <CheckoutHeader />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
        <div className="space-y-4">
          <CheckoutForm
            form={form}
            creatingOrder={creatingOrder}
            error={error}
            validationErrors={validationErrors}
            onSubmit={onSubmit}
            onShippingAddressChange={onShippingAddressChange}
            onPaymentMethodChange={onPaymentMethodChange}
            onNotesChange={onNotesChange}
          />

          {extendedForm.payment_method === "manual_transfer" ? (
            <ManualTransferForm
              value={manualTransfer}
              validationErrors={validationErrors}
              onChange={onManualTransferChange}
            />
          ) : null}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
        <PaymentMethodSelector
  form={extendedForm}
  validationErrors={validationErrors}
  onPaymentMethodChange={onPaymentMethodChange}
/>

          <OrderSummary summary={summary} />
        </aside>
      </div>
    </>
  );
}