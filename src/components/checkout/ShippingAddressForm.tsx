import type { CreateOrderPayload } from "@/types/order";
import type { ShippingAddress } from "@/lib/checkout/checkout";
import {
  CARD_CLASS,
  FIELD_CLASS,
  SHIPPING_FIELDS,
} from "../../types/checkout.constants";
import { StepTitle } from "./StepTitle";

type ShippingAddressFormProps = {
  form: CreateOrderPayload;
  onChange: (key: keyof ShippingAddress, value: string) => void;
};

export function ShippingAddressForm({
  form,
  onChange,
}: ShippingAddressFormProps) {
  return (
    <div className={CARD_CLASS}>
      <StepTitle number={1} title="Shipping Address" />

      <div className="grid gap-4 md:grid-cols-2">
        {SHIPPING_FIELDS.map((field) => {
          const value = form.shipping_address[field.key] ?? "";
          const className = `${FIELD_CLASS} ${field.className ?? ""}`;

          return (
            <label key={field.key} className={`space-y-2 ${field.className ?? ""}`}>
              <span className="block text-sm font-semibold text-slate-700">
                {field.label}
                {field.required ? (
                  <span className="text-red-500"> *</span>
                ) : null}
              </span>

              {field.textarea ? (
                <textarea
                  value={value}
                  onChange={(event) => onChange(field.key, event.target.value)}
                  className={FIELD_CLASS}
                  placeholder={field.placeholder}
                  rows={3}
                  required={field.required}
                />
              ) : (
                <input
                  value={value}
                  onChange={(event) => onChange(field.key, event.target.value)}
                  className={className}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}