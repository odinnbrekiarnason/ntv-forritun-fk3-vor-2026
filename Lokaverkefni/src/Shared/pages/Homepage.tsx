import { Card, CardContent, CardAction, CardTitle, CardHeader } from "@/Shared/components/ui/card";
import { Show, SignInButton, SignUpButton } from "@clerk/react";
import stockImg from "/images/stockImg.png" ;
import { useNavigate } from "react-router";

export function HomePage() {
  const nav = useNavigate();
  return (
      <Card className="w-full h-auto bg-transparent border-2 border-solid border-gray-300">
        <CardAction className="flex gap-3 p-6 absolute top-0 right-90">

          <Show when={"signed-out"}>
            <SignUpButton mode="modal" />
              <div className="h-3"/>
            <SignInButton mode='modal'/>
          </Show>

          <Show when={"signed-in"}>
            <button onClick={() => nav("/products")} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              View Products
            </button>
          </Show>
        </CardAction>

        <div className="h-10"/>
        <CardHeader className="flex flex-col items-center gap-4">
          <CardTitle className="text-4xl h-12">Welcome to my online store!</CardTitle>

          <img src={stockImg} alt="Stock Image" className="w-100 h-100 mt-4 rounded-md object-cover" />


        </CardHeader>
      <CardContent>
        <p>Here you can browse our selection of products and add them to your cart.</p>
        <p>You can browse our products without signing in, but you need an account to place an order.</p>
      </CardContent>
      <div className="h-3"/>
    </Card>
  )
}