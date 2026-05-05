export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus =
  | "unpaid"
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "cancelled";

  export type PaymentMethod =
  | "manual_transfer"
  | "bank_transfer"
  | "cod"
  | "midtrans";

export type Order = {
  id: number | string;
  order_number: string;
  user_id?: number | string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  currency?: string | null;
  subtotal: number | string;
  shipping_cost: number | string;
  discount_total: number | string;
  tax_total: number | string;
  grand_total: number | string;
  shipping_address?: ShippingAddress | null;
  payment_method?: string | null;
  notes?: string | null;
  items?: OrderItem[];
  status_histories?: OrderStatusHistory[];
  created_at?: string | null;
  updated_at?: string | null;
};

export type OrderItem = {
  id: number | string;
  product_id: number | string;
  product_name: string;
  sku?: string | null;
  quantity: number;
  currency?: string;
  unit_price: number | string;
  subtotal: number | string;
};

export type OrderStatusHistory = {
  id: number | string;
  from_status?: string | null;
  to_status: string;
  note?: string | null;
  changed_by?: number | string | null;
  created_at?: string | null;
};

export type ShippingAddress = {
  recipient_name?: string;
  phone?: string;
  address_line?: string;
  province?: string;
  city?: string;
  district?: string;
  postal_code?: string;
  courier_note?: string;
  notes?: string;
  [key: string]: unknown;
};

export type OrdersMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type OrdersQuery = {
  page?: number;
  per_page?: number;
  status?: OrderStatus | "";
  payment_status?: PaymentStatus | "";
  user_id?: number | string;
};

export type OrdersResponse = {
  data: Order[];
  meta?: OrdersMeta;
};

export type OrderResponse = {
  data: Order;
};

export type CancelOrderPayload = {
  reason?: string;
};