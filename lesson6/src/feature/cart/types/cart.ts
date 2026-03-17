<<<<<<<< HEAD:lesson6/src/features/cart/types.ts
import type { Product } from "../products/types";
========
import type { Product } from '@products/types/product';
>>>>>>>> 1f51e3d6f18e00b2de6c02a6558745ea735df33f:lesson6/src/feature/cart/types/cart.ts

export type CartItem = {
  product: Product;
  quantity: number;
};
