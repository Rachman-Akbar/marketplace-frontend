"use client";

import type { CheckoutViewProps } from "../types";
import { CheckoutForm } from "./CheckoutForm";
import { EmptyCartState } from "./EmptyCartState";
import { OrderSummary } from "./OrderSummary";

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
  onNotesChange,
}: CheckoutViewProps) {
  if (cartLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">Memuat keranjang...</p>
      </div>
    );
  }

  if (isCartEmpty) {
    return <EmptyCartState />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
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

      <OrderSummary summary={summary} />
    </div>
  );
}