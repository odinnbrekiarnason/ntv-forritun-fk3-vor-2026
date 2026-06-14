import { create } from 'zustand';
import type { CartShopType } from '../CartSchema/cartSchema';
import { postOrder } from '../../Hooks/useAPI/post/postOrder';
import { getProductByIdFrontend } from '../../Hooks/useAPI/get/getProducts';

export const UseCartShop = create<CartShopType>((set, get) => ({
  cartId: "GuestCart",
  items: [],

  setInitalState: (cartId, items) => {
    return set({ cartId, items });
  },

  addToCart: async (productId, quantity) => {
    const checkItem = await getProductByIdFrontend(productId);
    if (!checkItem) {
      console.error("Product not found");
      return;
    }
    const stock = checkItem.stock;
    if (quantity > stock) {
      console.error("Not enough stock available");
      return;
    }

    set(state => {
      const existingCart = state.items.find(item => item.productId === productId);
      if (existingCart) {
        const newQuantity = existingCart.quantity + quantity;

        if (newQuantity > stock) {
          console.error("Not enough stock available");
          return state;
        }
        localStorage.setItem(state.cartId, JSON.stringify({
          ...state,
          items: state.items.map(item => item.productId === productId ? { ...item, quantity: newQuantity } : item)
        }));

        return {
          ...state,
          items: state.items.map(item => item.productId === productId ? { ...item, quantity: newQuantity } : item)
        }

      } else {
        localStorage.setItem(state.cartId, JSON.stringify({
          ...state,
          items: [...state.items, { productId, quantity }]
        }));

        return {
          ...state,
          items: [...state.items, { productId, quantity }]
        }
      }
    })

  },

  changeQuantity: async (productId, quantity) => {
    const checkItem = await getProductByIdFrontend(productId);
    if (!checkItem) {
      console.error("Product not found");
      return;
    }

    const stock = checkItem.stock;

    if (quantity > stock) {
      return;
    } else if (quantity < 1) {
      return;
    }

    set(state => ({
      ...state,
      items: state.items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    }));
  },

  removeFromCart: (productId) => {
    return set(state => {
      const newItems = state.items.filter(item => item.productId !== productId);
      localStorage.setItem(state.cartId, JSON.stringify({
        ...state,
        items: newItems
      }));
      return {
        ...state,
        items: newItems
      };
    });
  },

  completePurchase: async (userId: string) => {
    const { items } = get();
    const success = await postOrder(items, userId);
    if (!success) {
      console.error("Failed to complete purchase");
      return;
    }
    window.alert("Purchase completed successfully!");
    return set(state => ({ ...state, items: [] }));
  },

  clearCart: () => {
    return set(state => {
      localStorage.setItem(state.cartId, JSON.stringify({
        ...state,
        items: []
      }));
      return {
        ...state,
        items: []
      }
    });
  }
}))