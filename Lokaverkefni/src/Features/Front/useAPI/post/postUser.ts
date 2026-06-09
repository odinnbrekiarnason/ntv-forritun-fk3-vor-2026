import { APIEndpoints, getApiUrl } from "@/Navigation";

export const postUserToDB = async(user: {id: string, username: string, email: string}) => {
  try{
    const result = await fetch(getApiUrl(APIEndpoints.USER), {
      method: "post", 
      body: JSON.stringify({ user }), 
      headers: {"Content-Type": "application/json"
      }});
    return await result.json();
  } catch(e) {
    console.error(e);
  }
}