import { APIEndpoints, getApiUrl } from "@/Navigation";
import { postOrder } from "./post/postOrder";
import { postCart, updateCart } from "./post/postCart";

interface ApiType {
  method: "GET" | "POST" | "PUT";
  endpoint: keyof typeof APIEndpoints;
  body?: {
    userId?: string;
    productId?: string;
    quantity?: number;
    orderData?: unknown;
  };
}

export const useApi = async ({ method, endpoint, body }: ApiType) => {
  try {
    const url = APIEndpoints[endpoint];

    if (method === "GET") {
      const response = await fetch(getApiUrl(url));

      if (!response.ok) {
        throw new Error(`Failed to fetch data (${response.status})`);
      }

      return await response.json();
    }

    if (method === "POST") {
      switch (endpoint) {
        case "ORDER":
          return await postOrder(body?.orderData as any, body?.userId ?? "");
        case "CART":
          return await postCart(body?.userId ?? "", body?.productId ?? "", body?.quantity ?? 1);
        default:
          throw new Error(`POST is not supported for endpoint: ${endpoint}`);
      }
    }

    if (method === "PUT") {
      switch (endpoint) {
        case "CART":
          return await updateCart(body?.userId ?? "", body?.productId ?? "", body?.quantity ?? 1);
        default:
          throw new Error(`PUT is not supported for endpoint: ${endpoint}`);
      }
    }

    throw new Error(`Unsupported method: ${method}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
