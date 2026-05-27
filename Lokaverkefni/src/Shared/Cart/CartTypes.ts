export interface CartType {
  userId: string;
  items: CartItemType[];
}

export interface CartItemType {
  productId: string;
  quantity: number;
} 

