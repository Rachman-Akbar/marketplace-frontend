"use client";

import { useState } from "react";
import type { Product } from "../../types";

type ProductTabsProps = {
  product: Product;
};

type Tab = "detail" | "ulasan" | "rekomendasi";

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("detail");

  return (
    <section className="rounded-2xl border bg-white p-6">
      <div className="flex gap-8 border-b">
        <button
          type="button"
          onClick={() => setActiveTab("detail")}
          className={`border-b-2 py-3 text-sm font-semibold ${
            activeTab === "detail"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500"
          }`}
        >
          Detail Produk
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ulasan")}
          className={`border-b-2 py-3 text-sm font-semibold ${
            activeTab === "ulasan"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500"
          }`}
        >
          Ulasan
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("rekomendasi")}
          className={`border-b-2 py-3 text-sm font-semibold ${
            activeTab === "rekomendasi"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500"
          }`}
        >
          Rekomendasi
        </button>
      </div>

      <div className="pt-6">
        {activeTab === "detail" && (
          <div>
            <h2 className="text-xl font-bold">Detail Produk</h2>
            <p className="mt-3 whitespace-pre-line leading-7 text-gray-600">
              {product.description || "Belum ada deskripsi produk."}
            </p>
          </div>
        )}

        {activeTab === "ulasan" && (
          <div>
            <h2 className="text-xl font-bold">Ulasan</h2>
            <p className="mt-3 text-gray-500">
              Belum ada ulasan untuk produk ini.
            </p>
          </div>
        )}

        {activeTab === "rekomendasi" && (
          <div>
            <h2 className="text-xl font-bold">Rekomendasi</h2>
            <p className="mt-3 text-gray-500">
              Rekomendasi produk bisa diisi dari kategori yang sama.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}