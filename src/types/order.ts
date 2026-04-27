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

export type MoneyValue = number | string;

export type ShippingAddress = {
  recipient_name: string;
  phone: string;
  address_line: string;
  province: string;
  city: string;
  district: string;
  postal_code: string;
  notes?: string | null;
};

export type OrderItem = {
  id: number;
  order_id?: number;
  product_id: number;
  product_name: string;
  sku?: string | null;
  quantity: number;
  currency: string;
  unit_price: MoneyValue;
  subtotal: MoneyValue;
  created_at?: string;
  updated_at?: string;
};

export type OrderStatusHistory = {
  id: number;
  order_id?: number;
  from_status?: OrderStatus | null;
  to_status: OrderStatus;
  note?: string | null;
  changed_by?: number | null;
  created_at: string;
  updated_at?: string;
};

export type Order = {
  id: number;
  order_number: string;
  user_id: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  currency: string;
  subtotal: MoneyValue;
  shipping_cost: MoneyValue;
  discount_total: MoneyValue;
  tax_total: MoneyValue;
  grand_total: MoneyValue;
  shipping_address: ShippingAddress | string;
  payment_method?: string | null;
  notes?: string | null;
  items?: OrderItem[];
  histories?: OrderStatusHistory[];
  created_at: string;
  updated_at: string;
};

export type OrdersResponse = {
  data: Order[];
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
};

export type OrderDetailResponse = {
  data: Order;
};

export type GetOrdersParams = {
  status?: OrderStatus | "";
  payment_status?: PaymentStatus | "";
  page?: number;
  per_page?: number;
};

export type CreateOrderPayload = {
  shipping_address: ShippingAddress;
  payment_method?: string;
  notes?: string;
};

export type CancelOrderPayload = {
  reason: string;
};