import type { CartItem } from "../../../Cart/CartSchema/cartSchema";
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
    if(!result.ok) {
      console.error("Failed to post order:", result.statusText);
      return false;
    }
    return result.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}