<<<<<<<< HEAD:lesson6/src/features/products/useProducts.ts
import { useState, useEffect } from "react";
import { fetchProducts } from "@/features/products/productService.js";
import type { Product } from "@/features/products/types.js";
========
import { useState, useEffect } from 'react';
import { fetchProducts } from '@products/services/productService';
import type { Product } from '@products/types/product';
>>>>>>>> 1f51e3d6f18e00b2de6c02a6558745ea735df33f:lesson6/src/feature/products/hooks/useProducts.ts

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, loading };
}
