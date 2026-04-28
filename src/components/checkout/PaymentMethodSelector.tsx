import type { PaymentMethod } from "@/lib/checkout/checkout";
import { CARD_CLASS, FIELD_CLASS, PAYMENT_METHODS } from "../../types/checkout.constants";
import { StepTitle } from "./StepTitle";

type PaymentMethodSelectorProps = {
  paymentMethod: PaymentMethod;
  notes?: string | null;
  onPaymentMethodChange: (value: PaymentMethod) => void;
  onNotesChange: (value: string) => void;
};

export function PaymentMethodSelector({
  paymentMethod,
  notes,
  onPaymentMethodChange,
  onNotesChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className={CARD_CLASS}>
      <StepTitle number={2} title="Payment Method" />

      <div className="grid gap-3 md:grid-cols-2">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = paymentMethod === method.value;

          return (
            <button
              key={method.value}
              type="button"
              onClick={() => onPaymentMethodChange(method.value)}
              className={`rounded-xl border-2 p-4 text-left transition ${
                isSelected
                  ? "border-emerald-700 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              <span className="block font-bold">{method.label}</span>
              <span className="mt-1 block text-xs leading-5">
                {method.description}
              </span>
            </button>
          );
        })}
      </div>

      <label className="mt-5 block space-y-2">
        <span className="block text-sm font-semibold text-slate-700">
          Catatan Order
        </span>

        <textarea
          value={notes ?? ""}
          onChange={(event) => onNotesChange(event.target.value)}
          className={`w-full ${FIELD_CLASS}`}
          placeholder="Catatan order, opsional"
          rows={3}
        />
      </label>
    </div>
  );
}