import type { CheckoutViewProps } from "@/domains/checkout/types";
import { CheckoutForm } from "@/domains/checkout/components/CheckoutForm";
import { CheckoutHeader } from "@/domains/checkout/components/CheckoutHeader";
import { EmptyCartState } from "@/domains/checkout/components/EmptyCartState";
import { OrderSummary } from "@/domains/checkout/components/OrderSummary";

export function CheckoutView(props: CheckoutViewProps) {
  if (props.cartLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          Memuat checkout...
        </div>
      </main>
    );
  }

  if (props.isCartEmpty) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <CheckoutHeader />
        <EmptyCartState />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <CheckoutHeader />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <CheckoutForm
          form={props.form}
          creatingOrder={props.creatingOrder}
          error={props.error}
          validationErrors={props.validationErrors}
          onSubmit={props.onSubmit}
          onShippingAddressChange={props.onShippingAddressChange}
          onPaymentMethodChange={props.onPaymentMethodChange}
          onNotesChange={props.onNotesChange}
        />

        <OrderSummary summary={props.summary} />
      </div>
    </main>
  );
}
