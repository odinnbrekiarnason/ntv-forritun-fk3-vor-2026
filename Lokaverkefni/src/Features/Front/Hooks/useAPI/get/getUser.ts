import { APIEndpoints, getApiUrl } from "@/Features/navigation/Navigation";

export type FrontendUser = {
  clerk_uid: string;
  username: string;
  firstname: string;
  email: string;
  shop_role: string;
};

export const getUserFrontEnd = async(userId: string): Promise<FrontendUser | undefined> => {
  try{
    const response = await fetch(getApiUrl(`${APIEndpoints.USER}/${userId}`));
    const data = response.ok ? await response.json() as FrontendUser : undefined;
    if(!data) {
      return undefined;
    }
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}