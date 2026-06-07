import { Card, CardContent, CardTitle, CardHeader } from "@/Shared/components/ui/card";
import { Routes } from "@/Navigation";
import { ShoppingCart } from "lucide-react";
import stockImg from "/images/stockImg.png" ;
import { useNavigate } from "react-router";

export function HomePage() {
  const nav = useNavigate();

  return (
      <Card className="w-full h-auto bg-transparent">
        <div className="h-10"/>
        
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="flex w-full justify-end">
            <button
              type="button"
              onClick={() => nav(Routes.CART)}
              aria-label="Open cart"
              className="rounded-full border border-slate-300 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-500 hover:bg-slate-50"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
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