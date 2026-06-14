import type { Product } from "@/Features/Front/Shared/Schemas/ProductsSchema";
import { APIEndpoints, getApiUrl } from "@/Features/navigation/Navigation";



export const getProductDetails = async (id: string): Promise<Product | undefined> => {
  try {
    const response = await fetch(getApiUrl(`${APIEndpoints.PRODUCTS}/${id}`));
    if(!response.ok) {
      return undefined;
    }

    
  } catch(e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error(errorMessage);
    return undefined;
  }
}