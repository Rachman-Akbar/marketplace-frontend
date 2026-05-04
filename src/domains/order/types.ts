export type PaymentMethod = "manual_transfer" | "cod";

export type ShippingAddress = {
  recipient_name: string;
  phone: string;
  address_line: string;
  province: string;
  city: string;
  district: string;
  postal_code: string;
  notes: string;
};

export type CreateOrderPayload = {
  shipping_address: ShippingAddress;
  payment_method: PaymentMethod;
  notes: string;
};

export type OrderStatus =
  | "pending"
  | "waiting_payment"
  | "paid"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

export type OrderItem = {
  id: string;
  product_id: string;
  product_name: string;
  image_url?: string;
  variant?: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type Order = {
  id: string;
  order_number: string;
  items: OrderItem[];
  shipping_address: ShippingAddress;
  payment_method: PaymentMethod;
  notes: string;
  subtotal: number;
  shipping: number;
  estimated_tax: number;
  grand_total: number;
  status: OrderStatus;
  created_at: string;
};