import { APIEndpoints } from "@/Navigation";
import type { Product } from "@/Shared/Schemas/ProductsSchema";


export const getAllProductsFrontend = async (): Promise<Product[] | undefined> => {
  try {
    const response = await fetch(APIEndpoints.PRODUCTS);

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