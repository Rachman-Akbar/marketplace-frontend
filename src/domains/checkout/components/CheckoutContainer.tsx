"use client";

import { useCheckoutController } from "../application/useCheckoutController";
import { CheckoutView } from "./CheckoutView";

export function CheckoutContainer() {
  const controller = useCheckoutController();

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <CheckoutView {...controller} />
      </div>
    </main>
  );
}