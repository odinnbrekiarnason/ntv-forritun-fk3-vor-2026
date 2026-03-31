import { createContext, type ReactNode, } from 'react';
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
  const { items, removeItem, updateQuantity, addToCart} = useAppStore()

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
