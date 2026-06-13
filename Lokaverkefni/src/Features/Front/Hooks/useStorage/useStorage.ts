import { useUser } from "@clerk/react";
import type { CartItem, CartShopType } from "../../Cart/CartSchema/cartSchema";

export function getInitialStorage(user: ReturnType<typeof useUser>["user"]): Pick<CartShopType, "cartId" | "items"> {
const userId = user ? user.id : "guest"; 

  const createKey = `cart_${userId}`;
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


