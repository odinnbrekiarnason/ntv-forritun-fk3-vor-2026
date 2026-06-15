import { getApiUrl } from "@/Features/navigation/Navigation";
import { APIEndpoints } from "@/Features/navigation/Navigation";

interface Order {
  orderId: string;
  status: string;
  totalPrice: number;
  finishedAt: string;
  items: {
  productId: string;
  name: string;
  image: string;
  type: string;
  unitPrice: number;
  quantity: number
  }[];
}

type OrdersApiResponse = {
  orders: Order[];
};

export const getUserOrders = async (userId: string) => {
  try{
    const response = await fetch(getApiUrl(`${APIEndpoints.ORDER}/${userId}`));
    if (!response.ok) {
      console.log(`Failed to fetch user orders: ${response.statusText}`);
      throw new Error(`Failed to fetch user orders: ${response.statusText}`);
    }

    const data = await response.json() as OrdersApiResponse;

    if (!Array.isArray(data.orders)) {
      console.log("No orders found for the user");
      throw new Error("No orders found for the user");
    }

    return data.orders;
  } catch(e: any) {
    console.error(e.message);
    throw e;
  }
}