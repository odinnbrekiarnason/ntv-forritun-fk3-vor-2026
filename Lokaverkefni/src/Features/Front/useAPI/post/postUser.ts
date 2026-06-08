export const postUserToDB = async(userId: string) => {
  try{
    const result = await fetch("/api/user", {
      method: "post", 
      body: JSON.stringify({userId}), 
      headers: {"Content-Type": "application/json"
      }});
    return await result.json();
  } catch(e) {
    console.error(e);
  }
}