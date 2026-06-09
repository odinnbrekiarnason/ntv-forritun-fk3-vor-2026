import { APIEndpoints, getApiUrl } from "@/Navigation";

export const postCart = async( userId: string, productId: string, quantity: number ) => {
  try{
    const response = await fetch(getApiUrl(APIEndpoints.CART), {
      method: "post",
      body: JSON.stringify({ userId, productId, quantity }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export const updateCart = async( userId: string, productId: string, quantity: number ) => {
  try{
    const response = await fetch(getApiUrl(APIEndpoints.CART), {
      method: "put",
      body: JSON.stringify({ userId, productId, quantity }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}

