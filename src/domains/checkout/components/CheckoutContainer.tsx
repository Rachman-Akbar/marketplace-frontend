"use client";

import type { Cart } from "@/domains/cart/types";
import type { Order } from "@/domains/order/types";
import { useCheckoutController } from "@/domains/checkout/application/useCheckoutController";
import { CheckoutView } from "@/domains/checkout/components/CheckoutView";

type CheckoutContainerProps = {
  cart: Cart | null;
  cartLoading?: boolean;
  onOrderCreated?: (order: Order) => void;
};

export function CheckoutContainer({
  cart,
  cartLoading = false,
  onOrderCreated,
}: CheckoutContainerProps) {
  const checkout = useCheckoutController({
    cart,
    cartLoading,
    onOrderCreated,
  });

  return <CheckoutView {...checkout} />;
}