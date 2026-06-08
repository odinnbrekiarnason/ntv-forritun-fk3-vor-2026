export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartShopType {
  cartId: string,
  userId: string,
  items: CartItem[],
  addToCart: (productId: string, quantity: number) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  completePurchase: () => void;
  clearCart: () => void;
}