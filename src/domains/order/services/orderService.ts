import type { CheckoutSummary } from "@/domains/checkout/types";
import type { CreateOrderPayload, Order, OrderItem } from "@/domains/order/types";

type CreateOrderFromCheckoutInput = {
  form: CreateOrderPayload;
  summary: CheckoutSummary;
};

function mapCheckoutItemToOrderItem(
  item: CheckoutSummary["items"][number]
): OrderItem {
  return {
    id: item.id,
    product_id: item.product_id,
    product_name: item.product_name,
    image_url: item.image_url,
    variant: item.variant,
    price: item.price,
    quantity: item.quantity,
    subtotal: item.subtotal,
  };
}

export async function createOrderFromCheckout({
  form,
  summary,
}: CreateOrderFromCheckoutInput): Promise<Order> {
  await new Promise((resolve) => globalThis.setTimeout(resolve, 500));

  const createdAt = new Date().toISOString();
  const orderNumber = `ORD-${Date.now()}`;

  return {
    id: globalThis.crypto?.randomUUID?.() ?? orderNumber,
    order_number: orderNumber,
    items: summary.items.map(mapCheckoutItemToOrderItem),
    shipping_address: form.shipping_address,
    payment_method: form.payment_method,
    notes: form.notes,
    subtotal: summary.subtotal,
    shipping: summary.shipping,
    estimated_tax: summary.estimatedTax,
    grand_total: summary.grandTotal,
    status: form.payment_method === "cod" ? "processing" : "waiting_payment",
    created_at: createdAt,
  };
}