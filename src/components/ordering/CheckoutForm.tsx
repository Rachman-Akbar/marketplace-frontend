"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { CreateOrderPayload } from "@/types/order";

export default function CheckoutForm() {
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

    router.push(`/orders/${order.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Alamat Pengiriman
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nama Penerima
            </label>
            <input
              value={form.shipping_address.recipient_name}
              onChange={(e) =>
                updateShippingAddress("recipient_name", e.target.value)
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
              placeholder="Akbar"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Nomor HP
            </label>
            <input
              value={form.shipping_address.phone}
              onChange={(e) => updateShippingAddress("phone", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
              placeholder="08123456789"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Alamat Lengkap
            </label>
            <textarea
              value={form.shipping_address.address_line}
              onChange={(e) =>
                updateShippingAddress("address_line", e.target.value)
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
              rows={3}
              placeholder="Jl. Melati No. 10"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Provinsi
            </label>
            <input
              value={form.shipping_address.province}
              onChange={(e) =>
                updateShippingAddress("province", e.target.value)
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
              placeholder="DKI Jakarta"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Kota</label>
            <input
              value={form.shipping_address.city}
              onChange={(e) => updateShippingAddress("city", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
              placeholder="Jakarta Selatan"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Kecamatan
            </label>
            <input
              value={form.shipping_address.district}
              onChange={(e) =>
                updateShippingAddress("district", e.target.value)
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
              placeholder="Kebayoran Baru"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Kode Pos
            </label>
            <input
              value={form.shipping_address.postal_code}
              onChange={(e) =>
                updateShippingAddress("postal_code", e.target.value)
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
              placeholder="12110"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Catatan Alamat
            </label>
            <input
              value={form.shipping_address.notes ?? ""}
              onChange={(e) => updateShippingAddress("notes", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
              placeholder="Rumah warna putih"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Pembayaran</h2>

        <div className="mt-5 grid gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Metode Pembayaran
            </label>
            <select
              value={form.payment_method}
              onChange={(e) => updateField("payment_method", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
            >
              <option value="manual_transfer">Manual Transfer</option>
              <option value="cod">COD</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Catatan Order
            </label>
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => updateField("notes", e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-900"
              rows={3}
              placeholder="Tolong packing aman"
            />
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {validationErrors ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {Object.entries(validationErrors).map(([field, messages]) => (
            <div key={field}>
              <strong>{field}</strong>: {messages.join(", ")}
            </div>
          ))}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Memproses Order..." : "Buat Order"}
      </button>
    </form>
  );
}