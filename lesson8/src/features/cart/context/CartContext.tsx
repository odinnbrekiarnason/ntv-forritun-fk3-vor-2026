import { useState, useCallback, type ReactNode } from 'react';
import type { Product } from '@/features/products/types';
import type { CartItem } from '../types';
import { CartContext } from './cartContext';

export function CartProvider({ children }: { children: ReactNode }) {
  const { items, removeItem, updateQuantity, addToCart} = useAppStore()

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
