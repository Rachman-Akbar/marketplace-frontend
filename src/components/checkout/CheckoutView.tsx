"use client";

import type { CheckoutViewProps } from "../../types/checkout.types";
import { CheckoutHeader } from "./CheckoutHeader";
import { EmptyCartState } from "./EmptyCartState";
import { ShippingAddressForm } from "./ShippingAddressForm";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { CheckoutErrors } from "./CheckoutErrors";
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
  return (
    <div className="space-y-8">
      <CheckoutHeader />

      {isCartEmpty ? (
        <EmptyCartState />
      ) : (
        <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-8">
            <ShippingAddressForm
              form={form}
              onChange={onShippingAddressChange}
            />

            <PaymentMethodSelector
              paymentMethod={form.payment_method}
              notes={form.notes}
              onPaymentMethodChange={onPaymentMethodChange}
              onNotesChange={onNotesChange}
            />

            <CheckoutErrors
              error={error}
              validationErrors={validationErrors}
            />
          </section>

          <OrderSummary
            summary={summary}
            paymentMethod={form.payment_method}
            cartLoading={cartLoading}
            creatingOrder={creatingOrder}
          />
        </form>
      )}
    </div>
  );
}