import type { CartItem, Product } from "@/features";
import { create } from "zustand";

interface AppState {
  items: CartItem[],
  addCartItem: (product: Product) => void,
  updateItemQuantity: (productId: string, quantity: number) => void,
  removeCartItem: (productId: string) => void,
}

export const useAppStore = create<AppState>((set) => ({
  items: [],
  addCartItem: (product) => set((state) => {
    const existing = state.items.find((i) => i.product.id === product.id);

    if(existing) {
      return {
        items: state.items.map((item) => 
          item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item
      )
    };
  }
  return {items: [ ...state.items, { product, quantity: 1 }]};
}), 
  updateItemQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map((item) => 
      item.product.id === productId ? {...item, quantity} : item).filter((item) => item.quantity > 0)
  })),
  removeCartItem: (productId) => set((state) => ({
    items: state.items.filter((item) => item.product.id !== productId) 
  }))
}))