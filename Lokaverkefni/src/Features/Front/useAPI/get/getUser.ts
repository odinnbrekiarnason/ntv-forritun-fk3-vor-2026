import { APIEndpoints, getApiUrl } from "@/Navigation";

export const getUserFrontEnd = async(userId: string) => {
  try{
    const response = await fetch(getApiUrl(`${APIEndpoints.USER}/${userId}`));

    if(!response.ok) {
      throw new Error(`Failed to fetch user data (${response.status})`);
    }
    const data = (await response.json()) as { id: string, name: string, email: string };
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}