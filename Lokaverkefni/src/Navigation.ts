const path = import.meta.env.VITE_API_BASE_URL || "";
if(path === "") {
  console.warn("API base URL is not defined. Please set VITE_API_BASE_URL in your environment variables.");
}

export const Routes = {
  HOME: "/",
  PRODUCTS: "/products",
  CART: "/cart",
  CHECKOUT: "/checkout"
}

export const APIEndpoints = {
  PRODUCTS: "/api/products",
  USER: "/api/user",
  ORDER: "/api/order",
}

export function getApiUrl(endpoint: string): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  if(!baseUrl) {
    console.warn("API base URL is not defined. Please set VITE_API_BASE_URL in your environment variables.");
  }

  return `${baseUrl}${endpoint}`;
}