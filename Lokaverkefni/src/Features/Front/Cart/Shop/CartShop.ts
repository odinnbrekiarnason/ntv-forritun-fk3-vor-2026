import { create } from 'zustand';
import type { CartShopType } from '../CartSchema/cartSchema';
import { useUser } from '@clerk/react';

const getUserId = useUser()


export const UseCartShop = create<CartShopType>((set) => ({
  cartId: crypto.randomUUID(),
  userId: getUserId.user?.id || "",
  items: [],

  addToCart: (productId, quantity) => {
    const item = { productId, quantity };
    set(state => ({ ...state, items: [...state.items, item] }));
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

  completePurchase: () => {

  },

  clearCart: () => {
    set(state => ({ ...state, items: [] }));
  }
}))