import { Products } from '@/features/products';
import { useAppStore } from '@/shared/store/appStore';

export function ProductsPage() {
  const { addToCart } = useAppStore();
  return <Products onAddToCart={addToCart} />;
}
