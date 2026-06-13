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
  CART: "/api/cart"
}

export const getApiUrl = (path: string) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  const isBrowser = typeof window !== "undefined";
  const isLocalHost = isBrowser
    ? ["localhost", "127.0.0.1"].includes(window.location.hostname)
    : false;

  if (!baseUrl) {
    if (!isLocalHost) {
      throw new Error(
        "Missing VITE_API_BASE_URL. Set it to your Railway API origin to avoid same-host /api requests.",
      );
    }

    return path;
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`;
};