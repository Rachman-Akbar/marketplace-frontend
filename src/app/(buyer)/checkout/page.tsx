"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { CreateOrderPayload } from "@/types/order";

export default function CheckoutPage() {
  const router = useRouter();
  const { createOrder, loading, error, validationErrors } = useCreateOrder();

  const [form, setForm] = useState<CreateOrderPayload>({
    shipping_address: {
      recipient_name: "",
      phone: "",
      address_line: "",
      province: "",
      city: "",
      district: "",
      postal_code: "",
      notes: "",
    },
    payment_method: "manual_transfer",
    notes: "",
  });

  function updateShippingAddress(
    key: keyof CreateOrderPayload["shipping_address"],
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      shipping_address: {
        ...prev.shipping_address,
        [key]: value,
      },
    }));
  }

  function updateField(key: keyof CreateOrderPayload, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const order = await createOrder(form);

    router.push(`/orders/success?order_id=${order.id}`);
  }

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          Secure Checkout
        </h1>
        <p className="mt-2 text-slate-500">
          Lengkapi alamat pengiriman untuk membuat order dari cart aktif.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-12">
        <section className="space-y-6 lg:col-span-8">
          <div className="rounded-xl bg-slate-200/55 p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                1
              </span>
              <h2 className="text-3xl font-bold tracking-tight">
                Shipping Address
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                value={form.shipping_address.recipient_name}
                onChange={(e) =>
                  updateShippingAddress("recipient_name", e.target.value)
                }
                className="rounded-lg bg-white px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-700"
                placeholder="Nama penerima"
              />

              <input
                value={form.shipping_address.phone}
                onChange={(e) => updateShippingAddress("phone", e.target.value)}
                className="rounded-lg bg-white px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-700"
                placeholder="Nomor HP"
              />

              <textarea
                value={form.shipping_address.address_line}
                onChange={(e) =>
                  updateShippingAddress("address_line", e.target.value)
                }
                className="rounded-lg bg-white px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-700 md:col-span-2"
                placeholder="Alamat lengkap"
                rows={3}
              />

              <input
                value={form.shipping_address.province}
                onChange={(e) =>
                  updateShippingAddress("province", e.target.value)
                }
                className="rounded-lg bg-white px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-700"
                placeholder="Provinsi"
              />

              <input
                value={form.shipping_address.city}
                onChange={(e) => updateShippingAddress("city", e.target.value)}
                className="rounded-lg bg-white px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-700"
                placeholder="Kota"
              />

              <input
                value={form.shipping_address.district}
                onChange={(e) =>
                  updateShippingAddress("district", e.target.value)
                }
                className="rounded-lg bg-white px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-700"
                placeholder="Kecamatan"
              />

              <input
                value={form.shipping_address.postal_code}
                onChange={(e) =>
                  updateShippingAddress("postal_code", e.target.value)
                }
                className="rounded-lg bg-white px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-700"
                placeholder="Kode pos"
              />

              <input
                value={form.shipping_address.notes ?? ""}
                onChange={(e) => updateShippingAddress("notes", e.target.value)}
                className="rounded-lg bg-white px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-700 md:col-span-2"
                placeholder="Catatan alamat"
              />
            </div>
          </div>

          <div className="rounded-xl bg-slate-200/55 p-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                2
              </span>
              <h2 className="text-3xl font-bold tracking-tight">
                Payment Method
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <button
                type="button"
                onClick={() => updateField("payment_method", "manual_transfer")}
                className={`rounded-xl border-2 py-4 font-semibold ${
                  form.payment_method === "manual_transfer"
                    ? "border-emerald-700 bg-white text-emerald-700"
                    : "border-slate-300 bg-slate-100 text-slate-500"
                }`}
              >
                Manual Transfer
              </button>

              <button
                type="button"
                onClick={() => updateField("payment_method", "cod")}
                className={`rounded-xl border-2 py-4 font-semibold ${
                  form.payment_method === "cod"
                    ? "border-emerald-700 bg-white text-emerald-700"
                    : "border-slate-300 bg-slate-100 text-slate-500"
                }`}
              >
                COD
              </button>
            </div>

            <textarea
              value={form.notes ?? ""}
              onChange={(e) => updateField("notes", e.target.value)}
              className="mt-5 w-full rounded-lg bg-white px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-emerald-700"
              placeholder="Catatan order"
              rows={3}
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {validationErrors ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {Object.entries(validationErrors).map(([field, messages]) => (
                <p key={field}>
                  <strong>{field}</strong>: {messages.join(", ")}
                </p>
              ))}
            </div>
          ) : null}
        </section>

        <aside className="h-fit rounded-xl bg-white p-6 shadow-sm lg:col-span-4">
          <h2 className="text-3xl font-bold tracking-tight">Order Summary</h2>

          <div className="mt-5 rounded-lg bg-slate-100 p-4 text-sm text-slate-600">
            Order akan dibuat dari cart aktif kamu. Pastikan cart sudah berisi
            produk.
          </div>

          <div className="mt-5 space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Cart</span>
              <span>Active cart</span>
            </div>

            <div className="flex justify-between">
              <span>Payment</span>
              <span className="capitalize">
                {form.payment_method?.replaceAll("_", " ")}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-emerald-700 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Order..." : "Place Order"}
          </button>
        </aside>
      </form>
    </div>
  );
}