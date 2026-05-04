import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import type { Cart } from "@/domains/cart/types";
import type { Order } from "@/domains/order/types";
import { createOrderFromCheckout } from "@/domains/order/services/orderService";
import { buildCartSummary } from "@/domains/checkout/services/checkoutService";
import { useCheckoutForm } from "@/domains/checkout/application/useCheckoutForm";

type UseCheckoutControllerParams = {
  cart: Cart | null;
  cartLoading?: boolean;
  onOrderCreated?: (order: Order) => void;
};

export function useCheckoutController({
  cart,
  cartLoading = false,
  onOrderCreated,
}: UseCheckoutControllerParams) {
  const checkoutForm = useCheckoutForm();

  const [creatingOrder, setCreatingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const summary = useMemo(() => {
    return buildCartSummary(cart);
  }, [cart]);

  const isCartEmpty = !cartLoading && summary.items.length === 0;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

      const order = await createOrderFromCheckout({
        form: checkoutForm.form,
        summary,
      });

      setCreatedOrder(order);
      onOrderCreated?.(order);
    } catch (unknownError) {
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Gagal membuat order. Coba lagi."
      );
    } finally {
      setCreatingOrder(false);
    }
  };

  return {
    form: checkoutForm.form,
    summary,
    cartLoading,
    creatingOrder,
    error,
    validationErrors: checkoutForm.validationErrors,
    isCartEmpty,
    createdOrder,
    onSubmit,
    onShippingAddressChange: checkoutForm.onShippingAddressChange,
    onPaymentMethodChange: checkoutForm.onPaymentMethodChange,
    onNotesChange: checkoutForm.onNotesChange,
  };
}