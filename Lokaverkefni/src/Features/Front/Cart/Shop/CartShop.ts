import { create } from 'zustand';
import type { CartShopType } from '../CartSchema/cartSchema';
import { postOrder } from '../../useAPI/post/postOrder';



export const UseCartShop = create<CartShopType>((set, get) => ({
  cartId: crypto.randomUUID(),
  items: [],

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
    sessionStorage.setItem("cart", JSON.stringify(get().items));
  },

  changeQuantity: (productId, quantity) => {
    set(state => ({
      ...state,
      items: state.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    }));
    sessionStorage.setItem("cart", JSON.stringify(get().items));
  },

  removeFromCart: (productId) => {
    set(state => ({
      ...state,
      items: state.items.filter(item => item.productId !== productId)
    }));
    sessionStorage.setItem("cart", JSON.stringify(get().items));
  },

  completePurchase: async(userId: string) => {
    if (!userId) {
      console.error("Cannot complete purchase without userId");
      return;
    }

    const orderData = get().items;
    const result = await postOrder(orderData, userId);
    if(result) {
      console.log("Order completed successfully:", result);
      set((state) => ({ ...state, items: [] }));
      sessionStorage.setItem("cart", JSON.stringify(get().items));
    } else {
      console.error("Failed to complete order");
    }
  },

  clearCart: () => {
    set(state => ({ ...state, items: [] }));
    sessionStorage.setItem("cart", JSON.stringify(get().items));
  }
}))