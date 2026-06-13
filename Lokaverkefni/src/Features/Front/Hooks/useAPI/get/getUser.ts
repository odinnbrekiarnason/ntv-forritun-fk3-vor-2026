import { APIEndpoints, getApiUrl } from "@/Navigation";

export const getUserFrontEnd = async(userId: string) => {
  try{
    const response = await fetch(getApiUrl(`${APIEndpoints.USER}/${userId}`));
    const data = await response.ok ? await response.json() : undefined;
    if(!data) {
      return undefined;
    }
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}