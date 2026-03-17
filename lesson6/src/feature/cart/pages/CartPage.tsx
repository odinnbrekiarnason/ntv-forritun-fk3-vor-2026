<<<<<<<< HEAD:lesson6/src/features/cart/CartPage.tsx
import { useCart } from "@/features/cart/useCart.js";
import { CartSummary } from "@/features/cart/CartSummary.js";
========
import { useCart } from '@cart/hooks/useCart';
import { CartSummary } from '@cart/components/CartSummary';
>>>>>>>> 1f51e3d6f18e00b2de6c02a6558745ea735df33f:lesson6/src/feature/cart/pages/CartPage.tsx

export function CartPage() {
  const { items, removeFromCart } = useCart();

  return (
    <section>
      <h2>Your cart</h2>
      <CartSummary items={items} onRemove={removeFromCart} />
    </section>
  );
}
