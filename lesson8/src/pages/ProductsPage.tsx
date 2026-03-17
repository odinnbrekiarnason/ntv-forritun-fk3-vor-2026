import { Products } from '@/features/products';
import { useAppStore } from '@/shared/store/appStore';

export function ProductsPage() {
  const { addCartItem } = useAppStore();
  return <Products onAddToCart={addCartItem} />;
}
