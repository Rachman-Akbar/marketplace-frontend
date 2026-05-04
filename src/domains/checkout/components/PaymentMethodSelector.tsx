import { ERROR_CLASS, PAYMENT_METHODS } from "@/domains/checkout/constants";
import type { PaymentMethod } from "@/domains/checkout/types";
import type { CreateOrderPayload } from "@/domains/order/types";
import type { ValidationErrors } from "@/domains/checkout/types";
import { StepTitle } from "@/domains/checkout/components/StepTitle";

type PaymentMethodSelectorProps = {
  form: CreateOrderPayload;
  validationErrors: ValidationErrors;
  onPaymentMethodChange: (value: PaymentMethod) => void;
};

export function PaymentMethodSelector({
  form,
  validationErrors,
  onPaymentMethodChange,
}: PaymentMethodSelectorProps) {
  const error = validationErrors?.payment_method?.[0] ?? null;

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <StepTitle
        title="Metode Pembayaran"
        description="Pilih metode pembayaran yang ingin digunakan."
      />

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
          const active = form.payment_method === method.value;

          return (
            <label
              key={method.value}
              className={
                active
                  ? "flex cursor-pointer gap-3 rounded-xl border border-emerald-700 bg-emerald-50 p-4"
                  : "flex cursor-pointer gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-700"
              }
            >
              <input
                type="radio"
                name="payment_method"
                className="mt-1 accent-emerald-700"
                checked={active}
                onChange={() => onPaymentMethodChange(method.value)}
              />

              <span>
                <span className="block text-sm font-semibold text-slate-950">
                  {method.label}
                </span>
                <span className="mt-1 block text-sm text-slate-500">
                  {method.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>

      {error ? <p className={ERROR_CLASS}>{error}</p> : null}
    </section>
  );
}