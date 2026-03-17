<<<<<<<< HEAD:lesson6/src/features/cart/useCart.ts
import { useState, useEffect } from "react";
import { getCart, saveCart } from "@/features/cart/cartService.js";
import type { CartItem } from "@/types/cart.js";
import type { Product } from "@/features/products/types.js";
========
import { useState, useEffect } from 'react';
import { getCart, saveCart } from '@cart/services/cartService';
import type { CartItem } from '@cart/types/cart';
import type { Product } from '@products/types/product';
>>>>>>>> 1f51e3d6f18e00b2de6c02a6558745ea735df33f:lesson6/src/feature/cart/hooks/useCart.ts

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  function addToCart(product: Product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { product, quantity }];
    });
  }

  function removeFromCart(productId: string) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  return { items, addToCart, removeFromCart };
}
