"use client";

import type {
  PaymentMethod,
  ValidationErrors,
} from "@/domains/checkout/types";
import type { CreateOrderPayload } from "@/domains/order/types";

type ExtendedCheckoutForm = CreateOrderPayload & {
  payment_method: PaymentMethod;
};

type PaymentMethodSelectorProps = {
  form: ExtendedCheckoutForm;
  validationErrors: ValidationErrors;
  onPaymentMethodChange: (value: PaymentMethod) => void;
};

const METHODS: Array<{
  value: PaymentMethod;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}> = [
  {
    value: "midtrans",
    title: "Pembayaran Otomatis",
    description:
      "Pilih VA bank, QRIS, e-wallet, kartu, atau metode lain di halaman Midtrans.",
    icon: "💳",
    badge: "Recommended",
  },
  {
    value: "manual_transfer",
    title: "Transfer Manual",
    description:
      "Transfer ke rekening toko lalu tunggu verifikasi admin.",
    icon: "🏦",
  },
  {
    value: "cod",
    title: "COD",
    description: "Bayar langsung saat pesanan diterima.",
    icon: "📦",
  },
];

export function PaymentMethodSelector({
  form,
  validationErrors,
  onPaymentMethodChange,
}: PaymentMethodSelectorProps) {
  const error = validationErrors?.payment_method?.[0] ?? null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-bold text-slate-950">
          Metode Pembayaran
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Pilih cara pembayaran untuk pesanan ini.
        </p>
      </div>

      <div className="space-y-3 p-5">
        {METHODS.map((method) => {
          const active = form.payment_method === method.value;

          return (
            <button
              key={method.value}
              type="button"
              onClick={() => onPaymentMethodChange(method.value)}
              className={[
                "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition",
                active
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                  : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50",
              ].join(" ")}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-slate-200">
                {method.icon}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-950">
                    {method.title}
                  </span>

                  {method.badge ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                      {method.badge}
                    </span>
                  ) : null}
                </span>

                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  {method.description}
                </span>
              </span>

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
            </button>
          );
        })}

        {form.payment_method === "midtrans" ? (
          <div className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
            Setelah order dibuat, halaman Midtrans akan terbuka. Di sana pembeli
            bisa memilih BCA VA, BRI VA, Mandiri, QRIS, GoPay, ShopeePay, dan
            metode lain yang aktif di akun Midtrans kamu.
          </div>
        ) : null}

        {error ? (
          <p className="text-sm font-medium text-red-600">{error}</p>
        ) : null}
      </div>
    </section>
  );
}