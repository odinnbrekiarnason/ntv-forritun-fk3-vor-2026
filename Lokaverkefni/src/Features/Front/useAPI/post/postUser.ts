import { APIEndpoints, getApiUrl } from "@/Navigation";
import { useEffect } from "react";

export const postUserToDB = async(user: {clerk_uid: string, username: string, email: string, shop_role: string}) => {
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

type LoginUser = {
  id: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  primaryEmailAddress?: {
    emailAddress: string;
  } | null;
};

const buildUsername = (user: LoginUser): string => {
  if (user.username && user.username.trim()) {
    return user.username;
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
  if (fullName) {
    return fullName;
  }

  const emailPrefix = user.primaryEmailAddress?.emailAddress?.split("@")[0]?.trim();
  return emailPrefix || "user";
};

export const useOnLogin = (isLoaded: boolean, isSignedIn: boolean | undefined, user: LoginUser | null | undefined) => {
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      return;
    }

    const storageKey = `user_synced_${user.id}`;
    if (sessionStorage.getItem(storageKey)) {
      return;
    }

    const saveUser = async () => {
      try {
        await postUserToDB({
          clerk_uid: user.id,
          username: buildUsername(user),
          email,
          shop_role: "member"
        });
        sessionStorage.setItem(storageKey, "true");
      } catch (error) {
        console.error("Failed to run login callback", error);
      }
    };
    console.log('Running login callback for user:', user);
    void saveUser();
  }, [isLoaded, isSignedIn, user]);
};