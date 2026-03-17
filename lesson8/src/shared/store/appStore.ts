import type { CartItem, Product } from "@/features";
import { create, createStore } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

interface AppStore {
  items: CartItem[],
  addToCart: (product: Product) => void,
  updateQuantity: (productId: string, quantity: number) => void,
  removeItem: (productId: string) => void,
}

export const useAppStore = create<AppStore>((set) => ({
  items: [],
  addToCart: (product) => set((state) => {
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
  updateQuantity: (productId, quantity) => set((state) => ({
    items: state.items.map((item) => 
      item.product.id === productId ? {...item, quantity} : item).filter((item) => item.quantity > 0)
  })),
  removeItem: (productId) => set((state) => ({
    items: state.items.filter((item) => item.product.id !== productId) 
  }))
}))

export const appStore = createStore<AppStore>()(
  devtools(
    subscribeWithSelector((set) => ({
      items: [],
      addToCart: (product) => set((state) => {
        const existing = state.items.find((i) => i.product.id === product.id);

        if (existing) {
          return {
            items: state.items.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { items: [...state.items, { product, quantity: 1 }] };
      }),

      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item).filter((item) => item.quantity > 0)
      })),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId)
      }))
    }))
  )
)

