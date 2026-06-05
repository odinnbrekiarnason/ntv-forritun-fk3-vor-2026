import { create } from 'zustand';
import type { CartShopType } from '../CartSchema/cartSchema';


export const UseCartShop = create<CartShopType>((_set) => ({
  userId: "",
  items: [],

  addToCart: (_productId, _quantity) => {
  },

  changeQuantity: (_productId) => {},

  clearCart: () => {}
}))