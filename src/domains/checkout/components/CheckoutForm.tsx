"use client";

import type {
  CheckoutViewProps,
  ShippingAddress,
} from "../types";
import {
  CARD_CLASS,
  ERROR_CLASS,
  FIELD_CLASS,
  LABEL_CLASS,
  PAYMENT_METHODS,
  SHIPPING_FIELDS,
} from "../constants";

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

function firstError(
  errors: CheckoutFormProps["validationErrors"],
  key: string,
): string | null {
  return errors?.[key]?.[0] ?? null;
}

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
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className={CARD_CLASS}>
        <h2 className="text-xl font-bold text-slate-900">
          Alamat Pengiriman
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {SHIPPING_FIELDS.map((field) => {
            const value = form.shipping_address[field.key] ?? "";
            const errorMessage = firstError(
              validationErrors,
              `shipping_address.${String(field.key)}`,
            );

            return (
              <label
                key={field.key}
                className={field.className ?? undefined}
              >
                <span className={LABEL_CLASS}>{field.label}</span>

                {field.textarea ? (
                  <textarea
                    value={value}
                    required={field.required}
                    onChange={(event) =>
                      onShippingAddressChange(
                        field.key as keyof ShippingAddress,
                        event.target.value,
                      )
                    }
                    placeholder={field.placeholder}
                    className={`${FIELD_CLASS} mt-2 min-h-24`}
                  />
                ) : (
                  <input
                    value={value}
                    required={field.required}
                    onChange={(event) =>
                      onShippingAddressChange(
                        field.key as keyof ShippingAddress,
                        event.target.value,
                      )
                    }
                    placeholder={field.placeholder}
                    className={`${FIELD_CLASS} mt-2`}
                  />
                )}

                {errorMessage ? (
                  <p className={ERROR_CLASS}>{errorMessage}</p>
                ) : null}
              </label>
            );
          })}
        </div>
      </section>

      <section className={CARD_CLASS}>
        <h2 className="text-xl font-bold text-slate-900">
          Metode Pembayaran
        </h2>

        <div className="mt-5 grid gap-3">
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.value}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4"
            >
              <input
                type="radio"
                name="payment_method"
                value={method.value}
                checked={form.payment_method === method.value}
                onChange={() => onPaymentMethodChange(method.value)}
                className="mt-1"
              />

              <span>
                <span className="block font-semibold text-slate-900">
                  {method.label}
                </span>
                <span className="mt-1 block text-sm text-slate-500">
                  {method.description}
                </span>
              </span>
            </label>
          ))}
        </div>

        {firstError(validationErrors, "payment_method") ? (
          <p className={ERROR_CLASS}>
            {firstError(validationErrors, "payment_method")}
          </p>
        ) : null}
      </section>

      <section className={CARD_CLASS}>
        <h2 className="text-xl font-bold text-slate-900">
          Catatan Pesanan
        </h2>

        <textarea
          value={form.notes ?? ""}
          onChange={(event) => onNotesChange(event.target.value)}
          placeholder="Catatan untuk penjual"
          className={`${FIELD_CLASS} mt-4 min-h-24`}
        />
      </section>

      {error ? (
        <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={creatingOrder}
        className="w-full rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {creatingOrder ? "Memproses order..." : "Buat Pesanan"}
      </button>
    </form>
  );
}