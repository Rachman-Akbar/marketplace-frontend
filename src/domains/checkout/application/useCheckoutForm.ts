import { useState } from "react";
import { createInitialCheckoutForm } from "@/domains/checkout/services/checkoutService";
import type {
  CreateOrderPayload,
  PaymentMethod,
  ShippingAddress,
  ValidationErrors,
} from "@/domains/checkout/types";

function required(value: string): boolean {
  return value.trim().length > 0;
}

export function useCheckoutForm() {
  const [form, setForm] = useState<CreateOrderPayload>(() =>
    createInitialCheckoutForm(),
  );

  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors>(null);

  const onShippingAddressChange = (
    key: keyof ShippingAddress,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      shipping_address: {
        ...current.shipping_address,
        [key]: value,
      },
    }));

    setValidationErrors((current) => {
      if (!current) return current;

      const next = { ...current };
      delete next[`shipping_address.${String(key)}`];

      return Object.keys(next).length ? next : null;
    });
  };

  const onPaymentMethodChange = (value: PaymentMethod) => {
    setForm((current) => ({
      ...current,
      payment_method: value,
    }));

    setValidationErrors((current) => {
      if (!current) return current;

      const next = { ...current };
      delete next.payment_method;

      return Object.keys(next).length ? next : null;
    });
  };

  const onNotesChange = (value: string) => {
    setForm((current) => ({
      ...current,
      notes: value,
    }));
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string[]> = {};
    const address = form.shipping_address;

    if (!required(address.recipient_name)) {
      nextErrors["shipping_address.recipient_name"] = [
        "Nama penerima wajib diisi.",
      ];
    }

    if (!required(address.phone)) {
      nextErrors["shipping_address.phone"] = ["Nomor HP wajib diisi."];
    }

    if (!required(address.address_line)) {
      nextErrors["shipping_address.address_line"] = [
        "Alamat lengkap wajib diisi.",
      ];
    }

    if (!required(address.province)) {
      nextErrors["shipping_address.province"] = ["Provinsi wajib diisi."];
    }

    if (!required(address.city)) {
      nextErrors["shipping_address.city"] = ["Kota wajib diisi."];
    }

    if (!required(address.district)) {
      nextErrors["shipping_address.district"] = ["Kecamatan wajib diisi."];
    }

    if (!required(address.postal_code)) {
      nextErrors["shipping_address.postal_code"] = ["Kode pos wajib diisi."];
    }

    if (!form.payment_method) {
      nextErrors.payment_method = ["Metode pembayaran wajib dipilih."];
    }

    setValidationErrors(Object.keys(nextErrors).length ? nextErrors : null);

    return Object.keys(nextErrors).length === 0;
  };

  return {
    form,
    validationErrors,
    setValidationErrors,
    onShippingAddressChange,
    onPaymentMethodChange,
    onNotesChange,
    validate,
  };
}