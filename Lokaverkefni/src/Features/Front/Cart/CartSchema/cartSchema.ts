export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartShopType {
  cartId: string,
  items: CartItem[],
  addToCart: (productId: string, quantity: number) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  completePurchase: (userId: string) => Promise<void>;
  clearCart: () => void;
}