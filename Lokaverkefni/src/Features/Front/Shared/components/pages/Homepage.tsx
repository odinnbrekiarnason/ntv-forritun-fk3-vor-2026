import { Card, CardContent, CardTitle, CardHeader } from "@/Features/Front/Shared/components/ui/card";
import stockImg from "/images/stockImg.png";
import { ProductPageButton } from "../Buttons/productPageButton";

export function HomePage() {
  return (
    <Card className="w-full h-auto bg-transparent">
      <div className="h-10" />
      <CardHeader className="flex flex-col items-center gap-4">
        <CardTitle className="text-4xl h-12">
          Welcome to my online store!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <p>Here you can browse our selection of products and add them to your cart.</p>
        <p>You can browse our products without signing in, <br /> but you need an account to place an order.</p>
        <ProductPageButton /> 
        <img src={stockImg} alt="Stock Image" className="w-100 h-100 mt-4 rounded-md object-cover" />
      </CardContent>
      <div className="h-3" />
    </Card>
  )
}
