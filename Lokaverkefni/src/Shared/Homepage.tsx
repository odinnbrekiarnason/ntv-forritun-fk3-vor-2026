import { Button } from "@/Shared/components/ui/button";
import { Card, CardContent, CardAction, CardTitle, CardHeader } from "@/Shared/components/ui/card";
import { SignInButton, SignUpButton } from "@clerk/react";


export function HomePage() {

  return (
      <Card className="w-full h-auto bg-transparent border-2 border-solid border-gray-300">
        <CardAction className="flex gap-3 p-6 absolute top-0 right-90">
          <Button variant="outline" className="w-30">
            <SignUpButton mode="modal"/>
          </Button>
          <div className="h-3"/>
          <Button variant="outline" className="w-30">
            <SignInButton mode='modal'/>
          </Button>
        </CardAction>
        <div className="h-10"/>
        <CardHeader>
          <CardTitle className="text-4xl h-12">Welcome to my online store!</CardTitle>

        </CardHeader>
      <CardContent>
        <p>Here you can browse our selection of products and add them to your cart.</p>
        <p>You can browse our products without signing in, but you need an account to place an order.</p>
      </CardContent>
      <div className="h-3"/>
    </Card>
  )
}