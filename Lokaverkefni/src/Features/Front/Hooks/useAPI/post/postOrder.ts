import type { CartItem } from "../../../Cart/CartSchema/cartSchema";
import { APIEndpoints, getApiUrl } from "@/Navigation";
import { parseApiJson } from "../apiClient";

export const postOrder = async (orderData: CartItem[], userId: string) => {
  try {
    const result = await fetch(getApiUrl(APIEndpoints.ORDER), {
      method: "post",
      body: JSON.stringify({ orderData, userId }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await parseApiJson<{ message?: string; error?: string }>(result);
  } catch (e) {
    console.error(e);
  }
}