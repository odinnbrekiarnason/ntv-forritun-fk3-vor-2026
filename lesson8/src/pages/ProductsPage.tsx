import { Products } from '@/features/products';
import { useCart } from '@/features/cart/context/useCart';

export function ProductsPage() {
  const { addCartItem } = useAppStore();
  return <Products onAddToCart={addCartItem} />;
}
