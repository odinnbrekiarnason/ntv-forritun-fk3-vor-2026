import { APIEndpoints, getApiUrl } from "@/Features/navigation/Navigation";
import type { ProductDetail, Product } from "@/Features/Front/Shared/Schemas/ProductsSchema";


export const getAllProductsFrontend = async(): Promise<Product[] | undefined> => {
  try {
    const response = await fetch(getApiUrl(APIEndpoints.PRODUCTS));
    if(!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json() as unknown as Product[];

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
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const data = await response.json() as unknown as Product;

    if(data === undefined) {
      throw new Error("Product not found");
    }

    return data;
  } catch(e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error(errorMessage);
    return undefined;
  }
}

export const getProductDetailsFrontend = async(id: string, category: string): Promise<ProductDetail | undefined> => {
  try {
    const response = await fetch(getApiUrl(`${APIEndpoints.PRODUCTS}/${id}/details?category=${category}`));

    if(!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.statusText}`);
    }

    const data = await response.json() as unknown as ProductDetail;

    if(data === undefined) {
      throw new Error("No product details found");
    }

    return data;
  } catch(e: unknown) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error(errorMessage);
    return undefined;
  }
}