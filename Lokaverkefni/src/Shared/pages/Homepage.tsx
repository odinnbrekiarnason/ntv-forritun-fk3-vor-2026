import { Card, CardContent, CardAction, CardTitle, CardHeader } from "@/Shared/components/ui/card";
import { SignInButton, SignUpButton } from "@clerk/react";
import { APIEndpoints } from "@/Navigation";
import { useEffect, useState } from "react";

export function HomePage() {
  const [imageUrl, setImageUrl] = useState("../images/stockImg_forritun.webp");

  useEffect(() => {
    const fetchFeaturedImage = async (): Promise<void> => {
      try {
        const response = await fetch(APIEndpoints.PRODUCTS);

        if (!response.ok) {
          throw new Error(`Failed to fetch featured image (${response.status})`);
        }

        const data = (await response.json())

        console.log(data)

        if (data.length > 0 && data[0].img_url) {
          setImageUrl(data[0].img_url);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
      }
      console.log(imageUrl)
    };

    void fetchFeaturedImage();
  }, []);

  return (
      <Card className="w-full h-auto bg-transparent border-2 border-solid border-gray-300">
        <CardAction className="flex gap-3 p-6 absolute top-0 right-90">
          
            <SignUpButton mode="modal" />
          
          <div className="h-3"/>
          
            <SignInButton mode='modal'/>
          
        </CardAction>
        <div className="h-10"/>
        <CardHeader>
          <CardTitle className="text-4xl h-12">Welcome to my online store!</CardTitle>

          {imageUrl && <img src={imageUrl} alt="Store Image" className="w-full h-auto"/>}

        </CardHeader>
      <CardContent>
        <p>Here you can browse our selection of products and add them to your cart.</p>
        <p>You can browse our products without signing in, but you need an account to place an order.</p>
      </CardContent>
      <div className="h-3"/>
    </Card>
  )
}