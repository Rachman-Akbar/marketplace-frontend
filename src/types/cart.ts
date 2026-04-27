export type CartItem = {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
  subtotal: number;
};

export type Cart = {
  id: number | null;
  user_id: string | null;
  status: string;
  items: CartItem[];
  total_quantity: number;
  total_price: number;
};

export type AddCartItemPayload = {
  product_id: number;
  quantity: number;
};

export type UpdateCartItemPayload = {
  quantity: number;
};

export type CartApiResponse = {
  data: Cart;
  message?: string;
};