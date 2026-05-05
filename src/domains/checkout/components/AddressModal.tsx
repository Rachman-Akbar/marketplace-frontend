"use client";

import type { AddressOption } from "@/domains/checkout/types";

type AddressModalProps = {
  open: boolean;
  addresses: AddressOption[];
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export function AddressModal({
  open,
  addresses,
  selectedAddressId,
  onSelectAddress,
  onClose,
  onConfirm,
}: AddressModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-[2px]">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-bold text-slate-950">
            Pilih / Ubah Alamat
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-slate-100"
            aria-label="Tutup modal"
          >
            ×
          </button>
        </div>

        <div className="space-y-3 px-6 py-5">
          <p className="text-sm font-semibold text-slate-700">
            Alamat Tersimpan
          </p>

          {addresses.map((address) => {
            const active = selectedAddressId === address.id;

            return (
              <button
                key={address.id}
                type="button"
                onClick={() => onSelectAddress(address.id)}
                className={[
                  "flex w-full gap-4 rounded-xl border p-4 text-left transition",
                  active
                    ? "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-100"
                    : "border-slate-200 bg-white hover:border-emerald-300",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                    active
                      ? "border-emerald-600 bg-emerald-600"
                      : "border-slate-300 bg-white",
                  ].join(" ")}
                >
                  {active ? (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  ) : null}
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-bold text-slate-950">
                    {address.label} · {address.recipient_name}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">
                    {address.full_address}
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    {address.phone}
                  </span>
                </span>
              </button>
            );
          })}

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <span className="text-lg">+</span>
            Tambah Alamat Baru
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-slate-100 px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Gunakan Alamat Ini
          </button>
        </div>
      </div>
    </div>
  );
}