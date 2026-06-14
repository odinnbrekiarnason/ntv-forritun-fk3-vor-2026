export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartShopType {
  cartId: string,
  items: CartItem[],
  setInitalState: (cartId: string, items: CartItem[]) => void;
  addToCart: (productId: string, quantity: number) => void;
  changeQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  completePurchase: (userId: string, itemState?: CartItem[]) => Promise<boolean>;
  clearCart: () => void;
}