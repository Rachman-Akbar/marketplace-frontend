"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import {
  buildCartSummary,
  createInitialCheckoutForm,
  type PaymentMethod,
  type ShippingAddress,
} from "@/lib/checkout/checkout";
import type { CreateOrderPayload } from "@/types/order";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    createOrder,
    loading: creatingOrder,
    error,
    validationErrors,
  } = useCreateOrder();

  const { cart, loading: cartLoading, fetchCart } = useCart();

  const [form, setForm] = useState<CreateOrderPayload>(() =>
    createInitialCheckoutForm(),
  );

  useEffect(() => {
    if (!cart) {
      fetchCart().catch(() => {});
    }
  }, [cart, fetchCart]);

  const summary = useMemo(() => buildCartSummary(cart), [cart]);

  const isCartEmpty = !cartLoading && summary.items.length === 0;

  function updateShippingAddress(key: keyof ShippingAddress, value: string) {
    setForm((prev) => ({
      ...prev,
      shipping_address: {
        ...prev.shipping_address,
        [key]: value,
      },
    }));
  }

  function updatePaymentMethod(value: PaymentMethod) {
    setForm((prev) => ({
      ...prev,
      payment_method: value,
    }));
  }

  function updateNotes(value: string) {
    setForm((prev) => ({
      ...prev,
      notes: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (creatingOrder || cartLoading || summary.items.length === 0) {
      return;
    }

    const order = await createOrder(form);

    router.push(`/orders/success?order_id=${order.id}`);
  }

  return (
    <CheckoutView
      form={form}
      summary={summary}
      cartLoading={cartLoading}
      creatingOrder={creatingOrder}
      error={error}
      validationErrors={validationErrors}
      isCartEmpty={isCartEmpty}
      onSubmit={handleSubmit}
      onShippingAddressChange={updateShippingAddress}
      onPaymentMethodChange={updatePaymentMethod}
      onNotesChange={updateNotes}
    />
  );
}