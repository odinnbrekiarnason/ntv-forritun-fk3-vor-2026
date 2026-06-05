import { create } from 'zustand';
import type { CartShopType } from '../CartSchema/cartSchema';
import { useUser } from '@clerk/react';

const getUserId = useUser()


export const UseCartShop = create<CartShopType>((set) => ({
  userId: getUserId.user?.id || "",
  items: [],


  addToCart: (productId, quantity) => {
  },

  changeQuantity: (productId) => {},

  clearCart: () => {
    set(state => ({ ...state, items: [] }));
  }
}))