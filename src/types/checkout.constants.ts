import type { PaymentMethod, ShippingAddress } from "@/lib/checkout/checkout";

export const FIELD_CLASS =
  "rounded-lg bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-700";

export const CARD_CLASS = "rounded-2xl bg-white p-7 shadow-sm";

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
    placeholder: "Nomor HP",
    required: true,
  },
  {
    key: "address_line",
    label: "Alamat Lengkap",
    placeholder: "Alamat lengkap",
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
    label: "Kota",
    placeholder: "Kota",
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
    className: "md:col-span-2",
  },
];

export const PAYMENT_METHODS: Array<{
  label: string;
  description: string;
  value: PaymentMethod;
}> = [
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