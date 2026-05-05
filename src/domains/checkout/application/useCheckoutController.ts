"use client";

import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/domains/cart/hooks/useCart";
import type { Order } from "@/domains/order/types";
import {
  createMidtransPayment,
  type MidtransPayment,
} from "@/domains/order/services/paymentService";

import {
  buildCartSummary,
  createCheckout,
} from "@/domains/checkout/services/checkoutService";
import { payWithMidtransSnap } from "@/domains/checkout/services/midtransSnapClient";
import { useCheckoutForm } from "@/domains/checkout/application/useCheckoutForm";
import {
  mergeValidationErrors,
  validateManualTransfer,
} from "@/domains/checkout/application/paymentValidation";
import { DEFAULT_MANUAL_TRANSFER_FORM } from "@/domains/checkout/constants";
import type {
  CheckoutPhase,
  ManualTransferFormValue,
  MidtransChannel,
  PaymentMethod,
  ValidationErrors,
} from "@/domains/checkout/types";

type UseCheckoutControllerParams = {
  onOrderCreated?: (order: Order) => void;
};

function buildPaymentStatusUrl(
  orderNumber: string,
  state:
    | "pending"
    | "success"
    | "error"
    | "closed"
    | "manual_review"
    | "cod",
): string {
  const params = new URLSearchParams({
    order: orderNumber,
    state,
  });

  return `/orders/payments?${params.toString()}`;
}

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
  } = useCart();

  const checkoutForm = useCheckoutForm();

  const [midtransChannel, setMidtransChannel] =
    useState<MidtransChannel>("bca_va");

  const [manualTransfer, setManualTransfer] =
    useState<ManualTransferFormValue>({
      ...DEFAULT_MANUAL_TRANSFER_FORM,
    });

  const [manualTransferErrors, setManualTransferErrors] =
    useState<ValidationErrors>(null);

  const [checkoutPhase, setCheckoutPhase] =
    useState<CheckoutPhase>("idle");

  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [midtransPayment, setMidtransPayment] =
    useState<MidtransPayment | null>(null);

  useEffect(() => {
    fetchCart().catch(() => {
      // Error sudah disimpan di CartContext.
    });
  }, [fetchCart]);

  const summary = useMemo(() => {
    return buildCartSummary(cart);
  }, [cart]);

  const isCartEmpty = !cartLoading && summary.items.length === 0;

  const form = useMemo(
    () => ({
      ...checkoutForm.form,
      midtrans_channel: midtransChannel,
      manual_transfer: manualTransfer,
    }),
    [checkoutForm.form, manualTransfer, midtransChannel],
  );

  const validationErrors = useMemo(
    () =>
      mergeValidationErrors(
        checkoutForm.validationErrors,
        manualTransferErrors,
      ),
    [checkoutForm.validationErrors, manualTransferErrors],
  );

  const creatingOrder = [
    "creating_order",
    "creating_payment",
    "opening_midtrans",
  ].includes(checkoutPhase);

  const redirectToPaymentStatus = useCallback(
    async (
      orderNumber: string,
      state: Parameters<typeof buildPaymentStatusUrl>[1],
    ) => {
      await fetchCart();

      router.replace(buildPaymentStatusUrl(orderNumber, state));
      router.refresh();
    },
    [fetchCart, router],
  );

  const openMidtransPayment = useCallback(
    async (order: Order, payment: MidtransPayment) => {
      setMidtransPayment(payment);

      if (payment.snap_token) {
        setCheckoutPhase("opening_midtrans");

        try {
          await payWithMidtransSnap(payment.snap_token, {
            onSuccess: () => {
              setCheckoutPhase("waiting_payment");
              void redirectToPaymentStatus(order.order_number, "success");
            },
            onPending: () => {
              setCheckoutPhase("waiting_payment");
              void redirectToPaymentStatus(order.order_number, "pending");
            },
            onError: () => {
              setCheckoutPhase("failed");
              void redirectToPaymentStatus(order.order_number, "error");
            },
            onClose: () => {
              setCheckoutPhase("waiting_payment");
              void redirectToPaymentStatus(order.order_number, "closed");
            },
          });

          return;
        } catch (snapError) {
          if (payment.redirect_url) {
            window.location.href = payment.redirect_url;
            return;
          }

          throw snapError;
        }
      }

      if (payment.redirect_url) {
        window.location.href = payment.redirect_url;
        return;
      }

      throw new Error("Snap token atau redirect URL Midtrans tidak tersedia.");
    },
    [redirectToPaymentStatus],
  );

  const onPaymentMethodChange = useCallback(
    (value: PaymentMethod) => {
      checkoutForm.onPaymentMethodChange(value);

      if (value !== "manual_transfer") {
        setManualTransferErrors(null);
      }

      if (value === "midtrans" && !midtransChannel) {
        setMidtransChannel("bca_va");
      }
    },
    [checkoutForm, midtransChannel],
  );

  const onMidtransChannelChange = useCallback(
    (value: MidtransChannel) => {
      setMidtransChannel(value);
      checkoutForm.onPaymentMethodChange("midtrans");
      setManualTransferErrors(null);
    },
    [checkoutForm],
  );

  const onManualTransferChange = useCallback(
    (patch: Partial<ManualTransferFormValue>) => {
      setManualTransfer((previous) => ({
        ...previous,
        ...patch,
      }));

      setManualTransferErrors(null);
    },
    [],
  );

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setError(null);
      setCreatedOrder(null);
      setMidtransPayment(null);
      setManualTransferErrors(null);
      setCheckoutPhase("idle");

      if (isCartEmpty) {
        setError("Keranjang masih kosong.");
        return;
      }

      const isValid = checkoutForm.validate();

      if (!isValid) {
        return;
      }

      const payload = {
        ...checkoutForm.form,
        midtrans_channel: midtransChannel,
        manual_transfer: manualTransfer,
      };

      if (payload.payment_method === "manual_transfer") {
        const errors = validateManualTransfer(manualTransfer);

        if (errors) {
          setManualTransferErrors(errors);
          return;
        }
      }

      try {
        setCheckoutPhase("creating_order");

        const checkoutResponse = await createCheckout(payload);
        const order = checkoutResponse.data;

        setCreatedOrder(order);
        onOrderCreated?.(order);

        if (payload.payment_method === "midtrans") {
          setCheckoutPhase("creating_payment");

          const payment = await createMidtransPayment(order.order_number);

          await openMidtransPayment(order, payment);
          return;
        }

        if (payload.payment_method === "manual_transfer") {
          setCheckoutPhase("waiting_payment");

          await redirectToPaymentStatus(order.order_number, "manual_review");
          return;
        }

        setCheckoutPhase("order_created");

        await redirectToPaymentStatus(order.order_number, "cod");
      } catch (unknownError) {
        setCheckoutPhase("failed");

        setError(
          unknownError instanceof Error
            ? unknownError.message
            : "Gagal membuat order. Coba lagi.",
        );
      }
    },
    [
      checkoutForm,
      isCartEmpty,
      manualTransfer,
      midtransChannel,
      onOrderCreated,
      openMidtransPayment,
      redirectToPaymentStatus,
    ],
  );

  return {
    form,
    summary,
    cartLoading,
    creatingOrder,
    checkoutPhase,
    error: error ?? cartError,
    validationErrors,
    isCartEmpty,
    createdOrder,
    midtransPayment,
    onSubmit,
    onShippingAddressChange: checkoutForm.onShippingAddressChange,
    onPaymentMethodChange,
    onMidtransChannelChange,
    onManualTransferChange,
    onNotesChange: checkoutForm.onNotesChange,
  };
}