<<<<<<<< HEAD:lesson6/src/features/products/ProductListPage.tsx
import { useProducts } from "@/features/products/useProducts.js";
import { useCart } from "@/features/cart/useCart.js";
import { ProductCard } from "./ProductCard";
========
import { useProducts } from '@products/hooks/useProducts';
import { useCart } from '@cart/hooks/useCart';
import { ProductCard } from '@products/components/ProductCard';
>>>>>>>> 1f51e3d6f18e00b2de6c02a6558745ea735df33f:lesson6/src/feature/products/pages/ProductListPage.tsx

export function ProductListPage() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  if (loading) return <p>Loading products…</p>;

  return (
    <section>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>
    </section>
  );
}
