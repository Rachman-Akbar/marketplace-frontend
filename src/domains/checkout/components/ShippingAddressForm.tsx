import type { ChangeEvent } from "react";
import {
  ERROR_CLASS,
  FIELD_CLASS,
  LABEL_CLASS,
  SHIPPING_FIELDS,
} from "@/domains/checkout/constants";
import type { ShippingAddress, ValidationErrors } from "@/domains/checkout/types";
import type { CreateOrderPayload } from "@/domains/order/types";
import { StepTitle } from "@/domains/checkout/components/StepTitle";

type ShippingAddressFormProps = {
  form: CreateOrderPayload;
  validationErrors: ValidationErrors;
  onShippingAddressChange: (key: keyof ShippingAddress, value: string) => void;
};

function getFieldError(
  validationErrors: ValidationErrors,
  key: keyof ShippingAddress
): string | null {
  return validationErrors?.[`shipping_address.${String(key)}`]?.[0] ?? null;
}

export function ShippingAddressForm({
  form,
  validationErrors,
  onShippingAddressChange,
}: ShippingAddressFormProps) {
  const address = form.shipping_address;

  const handleChange =
    (key: keyof ShippingAddress) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onShippingAddressChange(key, event.target.value);
    };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <StepTitle
        title="Alamat Pengiriman"
        description="Pastikan data penerima dan alamat sudah benar."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {SHIPPING_FIELDS.map((field) => {
          const error = getFieldError(validationErrors, field.key);
          const value = address[field.key] ?? "";

          return (
            <label key={String(field.key)} className={field.className}>
              <span className={LABEL_CLASS}>
                {field.label}
                {field.required ? (
                  <span className="text-red-600"> *</span>
                ) : null}
              </span>

              {field.textarea ? (
                <textarea
                  rows={3}
                  className={`${FIELD_CLASS} mt-2 resize-none`}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={handleChange(field.key)}
                />
              ) : (
                <input
                  className={`${FIELD_CLASS} mt-2`}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={handleChange(field.key)}
                />
              )}

              {error ? <p className={ERROR_CLASS}>{error}</p> : null}
            </label>
          );
        })}
      </div>
    </section>
  );
}