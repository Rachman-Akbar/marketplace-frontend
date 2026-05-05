"use client";

import { BANK_DESTINATIONS } from "@/domains/checkout/constants";
import type {
  ManualTransferFormValue,
  ValidationErrors,
} from "@/domains/checkout/types";

type ManualTransferFormProps = {
  value: ManualTransferFormValue;
  validationErrors: ValidationErrors;
  onChange: (patch: Partial<ManualTransferFormValue>) => void;
};

export function ManualTransferForm({
  value,
  validationErrors,
  onChange,
}: ManualTransferFormProps) {
  const getError = (key: string) =>
    (validationErrors as Record<string, string[] | undefined>)?.[key]?.[0] ??
    null;

  const selectedBank = BANK_DESTINATIONS.find(
    (bank) => bank.value === value.bank_destination,
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-bold text-slate-950">
          Data Transfer Manual
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Silakan lakukan transfer ke rekening tujuan, lalu lengkapi data di
          bawah ini agar admin dapat memverifikasi pembayaran.
        </p>
      </div>

      {selectedBank ? (
        <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
            Rekening Tujuan
          </p>
          <p className="mt-2 text-sm font-bold text-slate-950">
            {selectedBank.label} · {selectedBank.account_number}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            a.n. {selectedBank.account_name}
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Bank Tujuan
          </label>
          <select
            value={value.bank_destination}
            onChange={(event) =>
              onChange({ bank_destination: event.target.value })
            }
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          >
            <option value="">Pilih Bank Tujuan</option>
            {BANK_DESTINATIONS.map((bank) => (
              <option key={bank.value} value={bank.value}>
                {bank.label} - {bank.account_number}
              </option>
            ))}
          </select>
          {getError("manual_transfer.bank_destination") ? (
            <p className="mt-1 text-xs font-medium text-red-600">
              {getError("manual_transfer.bank_destination")}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Nama Pemilik Rekening
          </label>
          <input
            value={value.sender_account_name}
            onChange={(event) =>
              onChange({ sender_account_name: event.target.value })
            }
            placeholder="Contoh: Mochammad Rachman"
            className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Nomor Rekening Pengirim
          </label>
          <input
            value={value.sender_account_number}
            onChange={(event) =>
              onChange({ sender_account_number: event.target.value })
            }
            placeholder="Masukkan nomor rekening pengirim"
            inputMode="numeric"
            className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Tanggal Transfer
          </label>
          <input
            value={value.transfer_date}
            onChange={(event) => onChange({ transfer_date: event.target.value })}
            type="date"
            className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Upload Bukti Transfer
          </label>

          <label className="flex min-h-28 cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-emerald-500 bg-emerald-50/40 p-4 transition hover:bg-emerald-50">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl text-emerald-600 shadow-sm">
              📎
            </span>

            <span className="min-w-0">
              <span className="block text-sm font-bold text-slate-800">
                {value.transfer_proof
                  ? value.transfer_proof.name
                  : "Klik atau seret file ke sini untuk mengunggah"}
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                Upload JPG/PNG/PDF. Maks. 5MB.
              </span>
            </span>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              className="sr-only"
              onChange={(event) =>
                onChange({
                  transfer_proof: event.target.files?.[0] ?? null,
                })
              }
            />
          </label>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Catatan untuk Admin{" "}
            <span className="font-normal text-slate-400">(Opsional)</span>
          </label>

          <textarea
            value={value.admin_note}
            onChange={(event) => onChange({ admin_note: event.target.value })}
            maxLength={200}
            placeholder="Tulis catatan jika ada informasi tambahan..."
            className="min-h-28 w-full resize-none rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />

          <p className="mt-1 text-right text-xs text-slate-400">
            {value.admin_note.length}/200
          </p>
        </div>
      </div>
    </section>
  );
}