export type CartItem = {
  id: number;
  product_id: number;
  product_name: string;
  product_image?: string | null;
  price: number;
  quantity: number;
  subtotal: number;
};

export type Cart = {
  id?: number;
  items: CartItem[];
  total_quantity: number;
  total_price: number;
};

export type CartApiResponse = {
  data: Cart;
};

export type AddCartItemPayload = {
  product_id: number;
  quantity: number;
};

export type UpdateCartItemPayload = {
  quantity: number;
};