import { create } from 'zustand';
import type { CartItemType, CartShopType } from '../CartSchema/cartSchema';
import { useUser } from '@clerk/react';

const getUserId = useUser()


export const UseCartShop = create<CartShopType>((set) => ({
  userId: getUserId.user?.id || "",
  items: [],


  addToCart: (productId, quantity) => {
    const item = { productId, quantity };
  },

  changeQuantity: (productId) => {
    
  },

  clearCart: () => {
    set(state => ({ ...state, items: [] }));
  }
}))