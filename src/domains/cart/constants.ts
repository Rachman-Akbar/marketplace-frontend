export const CART_ENDPOINTS = {
  root: "/carts",
  items: "/carts/items",
  item: (productId: number) => `/carts/items/${productId}`,
} as const;