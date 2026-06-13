import { APIEndpoints, getApiUrl } from "@/Navigation";
import type { Product } from "@/Features/Front/Shared/Schemas/ProductsSchema";


export const getAllProductsFrontend = async(): Promise<Product[] | undefined> => {
  try {
    const response = await fetch(getApiUrl(APIEndpoints.PRODUCTS));

    if (!response.ok) {
      throw new Error(`Failed to fetch products (${response.status})`);
    }

    const data = (await response.json()) as Product[];

    if (data === undefined) {
      throw new Error("No products found");
    }

    return data;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error(errorMessage);
    return undefined;
  }
};

export const getProductByIdFrontend = async(id: string): Promise<Product | undefined> => {
  try {
    const response = await fetch(getApiUrl(`${APIEndpoints.PRODUCTS}/${id}`));
    if(!response.ok) {
      return undefined;
    }

    const data = (await response.json()) as Product;

    if(data === undefined) {
      return undefined;
    }

    return data;
  } catch(e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error(errorMessage);
    return undefined;
  }
}