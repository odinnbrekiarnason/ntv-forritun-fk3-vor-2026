import { useUser } from "@clerk/react";
import type { CartItem, CartShopType } from "../../Cart/CartSchema/cartSchema";

export function getInitialStorage(): Pick<CartShopType, "cartId" | "items"> | undefined {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) return undefined;

  const createKey = `cart_${user.id}`;
  const initialKey = localStorage.getItem(createKey);
  if (!initialKey) {
    localStorage.setItem(createKey, JSON.stringify({
      cartId: createKey,
      items: [] as CartItem[],
    }));
    return {
      cartId: createKey,
      items: [] as CartItem[],
    };
  }
  return JSON.parse(initialKey) as Pick<CartShopType, "cartId" | "items">;
}


