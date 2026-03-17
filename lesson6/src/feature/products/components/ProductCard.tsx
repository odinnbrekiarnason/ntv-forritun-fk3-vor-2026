<<<<<<<< HEAD:lesson6/src/features/products/ProductCard.tsx
import type { Product } from "@/features/products/types.js";
import { formatPrice } from "@/shared/utils/formatPrice.js";
import { Button } from "../shared/components/Button.js";
========
import type { Product } from '@products/types/product';
import { formatPrice } from '@shared/utils/formatPrice';
import { Button } from '@shared/components/Button';
>>>>>>>> 1f51e3d6f18e00b2de6c02a6558745ea735df33f:lesson6/src/feature/products/components/ProductCard.tsx

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{formatPrice(product.price)}</p>
      <Button onClick={() => onAdd(product)}>Add to cart</Button>
    </div>
  );
}
