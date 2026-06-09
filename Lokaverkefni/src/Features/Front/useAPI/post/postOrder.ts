import type { CartItem } from "../../Cart/CartSchema/cartSchema";
import { APIEndpoints, getApiUrl } from "@/Navigation";

export const postOrder = async (orderData: CartItem[], userId: string) => {
  try {
    const result = await fetch(getApiUrl(APIEndpoints.ORDER), {
      method: "post",
      body: JSON.stringify({ orderData, userId }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await result.json();
  } catch (e) {
    console.error(e);
  }
}