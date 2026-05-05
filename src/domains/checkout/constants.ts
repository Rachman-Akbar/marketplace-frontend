import type {
  ManualTransferFormValue,
  MidtransChannel,
  PaymentMethod,
  ShippingAddress,
} from "@/domains/checkout/types";

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
  value: PaymentMethod;
  label: string;
  description: string;
}> = [
  {
    value: "midtrans",
    label: "Pembayaran Otomatis",
    description:
      "Pilih VA bank, QRIS, e-wallet, kartu, atau metode lain di halaman pembayaran Midtrans.",
  },
  {
    value: "manual_transfer",
    label: "Manual Transfer",
    description:
      "Transfer manual ke rekening toko dan tunggu verifikasi admin.",
  },
  {
    value: "cod",
    label: "COD",
    description: "Bayar langsung saat pesanan diterima.",
  },
];

export const DEFAULT_MANUAL_TRANSFER_FORM: ManualTransferFormValue = {
  bank_destination: "",
  sender_account_name: "",
  sender_account_number: "",
  transfer_date: "",
  transfer_proof: null,
  admin_note: "",
};

export const BANK_DESTINATIONS = [
  {
    value: "bca",
    label: "BCA",
    account_number: "1234567890",
    account_name: "The Curated Canvas",
  },
  {
    value: "bri",
    label: "BRI",
    account_number: "0987654321",
    account_name: "The Curated Canvas",
  },
  {
    value: "mandiri",
    label: "Mandiri",
    account_number: "1122334455",
    account_name: "The Curated Canvas",
  },
  {
    value: "bni",
    label: "BNI",
    account_number: "5566778899",
    account_name: "The Curated Canvas",
  },
];

export const MIDTRANS_TOP_CHANNELS: Array<{
  value: MidtransChannel;
  label: string;
  logo: string;
  brandClass: string;
}> = [
  {
    value: "bca_va",
    label: "BCA Virtual Account",
    logo: "BCA",
    brandClass: "text-blue-700",
  },
  {
    value: "bri_va",
    label: "BRI Virtual Account",
    logo: "BRI",
    brandClass: "text-blue-600",
  },
  {
    value: "mandiri_va",
    label: "Mandiri Virtual Account",
    logo: "mandiri",
    brandClass: "text-yellow-600",
  },
  {
    value: "bni_va",
    label: "BNI Virtual Account",
    logo: "BNI",
    brandClass: "text-orange-600",
  },
];

export const MIDTRANS_CHANNELS: Array<{
  value: MidtransChannel;
  label: string;
  brandClass: string;
}> = [
  {
    value: "shopeepay",
    label: "ShopeePay",
    brandClass: "text-orange-600",
  },
  {
    value: "gopay",
    label: "GoPay",
    brandClass: "text-sky-600",
  },
  {
    value: "ovo",
    label: "OVO",
    brandClass: "text-purple-700",
  },
  {
    value: "dana",
    label: "DANA",
    brandClass: "text-blue-500",
  },
  {
    value: "qris",
    label: "QRIS",
    brandClass: "text-slate-950",
  },
  {
    value: "permata_va",
    label: "PermataBank",
    brandClass: "text-teal-600",
  },
];