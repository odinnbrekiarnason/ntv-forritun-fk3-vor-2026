import { create } from 'zustand';
import type { CartShopType } from '../CartSchema/cartSchema';
import { postOrder } from '../../Hooks/useAPI/post/postOrder';

export const UseCartShop = create<CartShopType>((set, get) => ({
  cartId: "default",
  items: [],

  setInitalState: (cartId, items) => {
    set({ cartId, items });
  },

  addToCart: (productId, quantity) => {
    const item = { productId, quantity };
    set(state => {
      const existingItem = state.items.find(i => i.productId === productId);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(i =>
            i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, item]
        };
      }
    })
  },

  changeQuantity: (productId, quantity) => {
    set(state => ({
      ...state,
      items: state.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    }));
  },

  removeFromCart: (productId) => {
    set(state => ({
      ...state,
      items: state.items.filter(item => item.productId !== productId)
    }));
  },

  completePurchase: async(userId: string) => {
    const orderData = get().items;
    const success = await postOrder(orderData, userId);
    if(!success) {
      console.error("Failed to complete purchase");
      return;
    }
    console.log("Purchase completed successfully");
    set(state => ({ ...state, items: [] }));
  },

  clearCart: () => {
    set(state => ({ ...state, items: [] }));
  }
}))