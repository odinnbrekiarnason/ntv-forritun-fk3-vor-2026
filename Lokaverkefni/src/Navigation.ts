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
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error(
      "VITE_API_BASE_URL is missing. Set it to your Railway API origin so requests do not fall back to the current host.",
    );
  }

  return `${baseUrl.replace(/\/$/, "")}${endpoint}`;
}