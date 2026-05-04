"use client";

import { useCheckoutController } from "../application/useCheckoutController";
import { CheckoutView } from "./CheckoutView";

export function CheckoutContainer() {
  const controller = useCheckoutController();

  return <CheckoutView {...controller} />;
}