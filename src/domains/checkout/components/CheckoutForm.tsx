import type { ChangeEvent } from "react";
import { FIELD_CLASS, LABEL_CLASS } from "@/domains/checkout/constants";
import type { CheckoutViewProps } from "@/domains/checkout/types";
import { CheckoutErrors } from "@/domains/checkout/components/CheckoutErrors";
import { PaymentMethodSelector } from "@/domains/checkout/components/PaymentMethodSelector";
import { ShippingAddressForm } from "@/domains/checkout/components/ShippingAddressForm";

type CheckoutFormProps = Pick<
  CheckoutViewProps,
  | "form"
  | "creatingOrder"
  | "error"
  | "validationErrors"
  | "onSubmit"
  | "onShippingAddressChange"
  | "onPaymentMethodChange"
  | "onNotesChange"
>;

export function CheckoutForm({
  form,
  creatingOrder,
  error,
  validationErrors,
  onSubmit,
  onShippingAddressChange,
  onPaymentMethodChange,
  onNotesChange,
}: CheckoutFormProps) {
  const handleNotesChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onNotesChange(event.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <CheckoutErrors error={error} />

      <ShippingAddressForm
        form={form}
        validationErrors={validationErrors}
        onShippingAddressChange={onShippingAddressChange}
      />

      <PaymentMethodSelector
        form={form}
        validationErrors={validationErrors}
        onPaymentMethodChange={onPaymentMethodChange}
      />

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <label>
          <span className={LABEL_CLASS}>Catatan Order</span>

          <textarea
            rows={3}
            className={`${FIELD_CLASS} mt-2 resize-none`}
            placeholder="Catatan tambahan untuk penjual"
            value={form.notes ?? ""}
            onChange={handleNotesChange}
          />
        </label>
      </section>

      <button
        type="submit"
        disabled={creatingOrder}
        className="w-full rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {creatingOrder ? "Membuat order..." : "Buat Order"}
      </button>
    </form>
  );
}