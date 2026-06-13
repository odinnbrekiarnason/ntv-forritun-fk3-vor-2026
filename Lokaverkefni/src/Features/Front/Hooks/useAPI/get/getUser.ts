import { APIEndpoints, getApiUrl } from "@/Navigation";
import { parseApiJson } from "../apiClient";

export const getUserFrontEnd = async(userId: string) => {
  try{
    const response = await fetch(getApiUrl(`${APIEndpoints.USER}/${userId}`));
    const data = await parseApiJson<{ id: string, name: string, email: string }>(response);
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}