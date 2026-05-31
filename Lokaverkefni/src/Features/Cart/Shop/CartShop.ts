import { create } from 'zustand';
import type { CartShopType } from '../CartSchema/cartSchema';


export const UseCartShop = create<CartShopType>((set) => ({
  userId: "",
  items: [],

  addToCart: (productId, quantity) => {
  },

  changeQuantity: (productId) => {},

  clearCart: () => {}
}))