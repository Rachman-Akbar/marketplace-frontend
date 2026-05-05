import type { PaymentMethod, ShippingAddress } from "@/domains/checkout/types";

export const FIELD_CLASS =
  "w-full rounded-lg bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-700";

export const CARD_CLASS =
  "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100";

export const LABEL_CLASS = "text-sm font-medium text-slate-700";

export const ERROR_CLASS = "mt-1 text-xs font-medium text-red-600";

export const SHIPPING_FIELDS: Array<{
  key: keyof ShippingAddress;
  label: string;
  placeholder: string;
  required?: boolean;
  textarea?: boolean;
  className?: string;
}> = [
  {
    key: "recipient_name",
    label: "Nama Penerima",
    placeholder: "Nama penerima",
    required: true,
  },
  {
    key: "phone",
    label: "Nomor HP",
    placeholder: "Contoh: 081234567890",
    required: true,
  },
  {
    key: "address_line",
    label: "Alamat Lengkap",
    placeholder: "Nama jalan, nomor rumah, RT/RW, patokan",
    required: true,
    textarea: true,
    className: "md:col-span-2",
  },
  {
    key: "province",
    label: "Provinsi",
    placeholder: "Provinsi",
    required: true,
  },
  {
    key: "city",
    label: "Kota / Kabupaten",
    placeholder: "Kota / Kabupaten",
    required: true,
  },
  {
    key: "district",
    label: "Kecamatan",
    placeholder: "Kecamatan",
    required: true,
  },
  {
    key: "postal_code",
    label: "Kode Pos",
    placeholder: "Kode pos",
    required: true,
  },
  {
    key: "notes",
    label: "Catatan Alamat",
    placeholder: "Contoh: rumah pagar hitam",
    textarea: true,
    className: "md:col-span-2",
  },
];

export const PAYMENT_METHODS: Array<{
  label: string;
  description: string;
  value: PaymentMethod;
}> = [
  {
    label: "Midtrans",
    description:
      "Bayar online dengan VA, e-wallet, QRIS, kartu, dan metode lain via Midtrans.",
    value: "midtrans",
  },
  {
    label: "Manual Transfer",
    description: "Bayar melalui transfer bank setelah order dibuat.",
    value: "manual_transfer",
  },
  {
    label: "COD",
    description: "Bayar langsung saat pesanan diterima.",
    value: "cod",
  },
];