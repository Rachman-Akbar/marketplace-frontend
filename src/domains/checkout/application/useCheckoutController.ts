"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/domains/cart/hooks/useCart";
import type { Order } from "@/domains/order/types";

import {
  buildCartSummary,
  createCheckout,
} from "@/domains/checkout/services/checkoutService";
import { useCheckoutForm } from "@/domains/checkout/application/useCheckoutForm";

type UseCheckoutControllerParams = {
  onOrderCreated?: (order: Order) => void;
};

export function useCheckoutController(
  params: UseCheckoutControllerParams = {},
) {
  const { onOrderCreated } = params;

  const router = useRouter();

  const {
    cart,
    loading: cartLoading,
    error: cartError,
    fetchCart,
    clear,
  } = useCart();

  const checkoutForm = useCheckoutForm();

  const [creatingOrder, setCreatingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchCart().catch(() => {
      // Error sudah disimpan di CartContext.
    });
  }, [fetchCart]);

  const summary = useMemo(() => {
    return buildCartSummary(cart);
  }, [cart]);

  const isCartEmpty = !cartLoading && summary.items.length === 0;

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setError(null);
      setCreatedOrder(null);

      if (isCartEmpty) {
        setError("Keranjang masih kosong.");
        return;
      }

      const isValid = checkoutForm.validate();

      if (!isValid) {
        return;
      }

      try {
        setCreatingOrder(true);

        const response = await createCheckout(checkoutForm.form);

        const order = response.data;

        setCreatedOrder(order);
        onOrderCreated?.(order);

        await clear();

        router.replace(`/orders/${order.order_number}`);
        router.refresh();
      } catch (unknownError) {
        setError(
          unknownError instanceof Error
            ? unknownError.message
            : "Gagal membuat order. Coba lagi.",
        );
      } finally {
        setCreatingOrder(false);
      }
    },
    [
      checkoutForm,
      clear,
      isCartEmpty,
      onOrderCreated,
      router,
    ],
  );

  return {
    form: checkoutForm.form,
    summary,
    cartLoading,
    creatingOrder,
    error: error ?? cartError,
    validationErrors: checkoutForm.validationErrors,
    isCartEmpty,
    createdOrder,
    onSubmit,
    onShippingAddressChange: checkoutForm.onShippingAddressChange,
    onPaymentMethodChange: checkoutForm.onPaymentMethodChange,
    onNotesChange: checkoutForm.onNotesChange,
  };
}