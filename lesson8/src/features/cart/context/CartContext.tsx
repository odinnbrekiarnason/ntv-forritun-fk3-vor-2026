import { createContext, useContext, type ReactNode, } from 'react';
import type { Product } from '@/features/products/types';
import type { CartItem } from '../types';
import { useAppStore } from '@/shared/store/appStore';

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { items, removeCartItem: removeItem, updateItemQuantity: updateQuantity, addCartItem: addToCart} = useAppStore()

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
