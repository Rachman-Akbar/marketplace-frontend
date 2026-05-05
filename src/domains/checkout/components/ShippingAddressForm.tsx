"use client";

import { useMemo, useState } from "react";
import type { CreateOrderPayload } from "@/domains/order/types";
import type {
  AddressOption,
  ValidationErrors,
} from "@/domains/checkout/types";
import { AddressModal } from "./AddressModal";

type ShippingAddressFormProps = {
  form: CreateOrderPayload;
  validationErrors: ValidationErrors;
  onShippingAddressChange: (value: string) => void;
};

export function ShippingAddressForm({
  form,
  validationErrors,
  onShippingAddressChange,
}: ShippingAddressFormProps) {
  const [open, setOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState("home");

  const currentAddress = String(
    (form as CreateOrderPayload & { shipping_address?: string })
      .shipping_address ?? "",
  );

  const addresses = useMemo<AddressOption[]>(
    () => [
      {
        id: "home",
        label: "Rumah",
        recipient_name: "Mochammad",
        phone: "+62 815-5376-9480",
        full_address:
          currentAddress ||
          "modng2222p, Tulangan, Kab. Sidoarjo, Jawa Timur, 62815, Indonesia",
        is_default: true,
      },
      {
        id: "office",
        label: "Kantor",
        recipient_name: "Mochammad",
        phone: "+62 812-3456-7890",
        full_address:
          "Jl. Raya Jemursari No.123, Wonocolo, Kota Surabaya, Jawa Timur, 60237, Indonesia",
      },
    ],
    [currentAddress],
  );

  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ??
    addresses[0];

  const error = validationErrors?.shipping_address?.[0] ?? null;

  const confirmAddress = () => {
    onShippingAddressChange(
      `${selectedAddress.label} · ${selectedAddress.recipient_name}\n${selectedAddress.full_address}\n${selectedAddress.phone}`,
    );
    setOpen(false);
  };

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm font-black uppercase tracking-wide text-slate-500">
            Alamat Pengiriman
          </p>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Ganti
          </button>
        </div>

        <div className="flex gap-3">
          <span className="mt-1 text-emerald-600">●</span>

          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-950">
              {selectedAddress.label} · {selectedAddress.recipient_name}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              {currentAddress || selectedAddress.full_address}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {selectedAddress.phone}
            </p>
          </div>
        </div>

        {error ? (
          <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
        ) : null}
      </section>

      <AddressModal
        open={open}
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onSelectAddress={setSelectedAddressId}
        onClose={() => setOpen(false)}
        onConfirm={confirmAddress}
      />
    </>
  );
}