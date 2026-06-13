import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Features/Front/Shared/components/ui/card";
import { ShieldCheck, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { CartItem } from "./CartItem";
import { UseCartShop } from "../Shop/CartShop";
import { getProductByIdFrontend } from "../../Hooks/useAPI/get/getProducts";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Product } from "../../Shared/Schemas/ProductsSchema";
//import { useUser } from "@clerk/react";

type ShoppingCartProps = {
  onCheckout?: () => void;
};

export function ShoppingCart({ onCheckout }: ShoppingCartProps) {
  const { items, clearCart } = UseCartShop();
  //const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [price, setPrice] = useState(0);
  const nav = useNavigate();

  const calculatePrice = () => {
    let total = 0;
    items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if(product) {
        total += product.price * item.quantity;
      }
    });
    setPrice(total);
  }

  useEffect(() => {
    const fetchProducts = async() => {
      const productIds = items.map(item => item.productId);
      const productPromises = productIds.map(id => getProductByIdFrontend(id));
      const productsData = await Promise.all(productPromises);
      setProducts(productsData.filter((p) => p !== undefined));
    }
    calculatePrice();
    fetchProducts();
  }, [items]);

	return (
		<div className="w-full max-w-md">
			<Card className="overflow-hidden border border-slate-200 bg-white shadow-lg shadow-slate-300/40">
				<CardHeader className="border-b border-slate-100 pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2 text-slate-900">
							<ShoppingCartIcon className="h-4 w-4" />
							Your Cart
						</CardTitle>
            <button className="rounded-full bg-slate-900 px-2 py-1 text-xs font-semibold text-white" onClick={clearCart} >Clear Cart </button>
						<span className="rounded-full bg-slate-900 px-2 py-1 text-xs font-semibold text-white">
							{items.length}
						</span>
					</div>
				</CardHeader>

				<CardContent className="space-y-3 py-4">
          {items.map((item) => {
            const product = products.find(p => p.id === item.productId);
            return (
              <CartItem
                key={item.productId}
                id={item.productId}
                name={product?.product_name || "Unknown Product"}
                price={product?.price || 0}
                quantity={item.quantity}
                imageUrl={product?.img_url}
              />
            );
          })}
					<div className="space-y-2 border-t border-slate-100 pt-3 text-sm">
						<div className="flex items-center justify-between text-base font-bold text-slate-900">
							<span>Total</span>
							<span>${price}</span>
						</div>
					</div>
				</CardContent>

				<CardFooter className="flex-col items-stretch gap-2 border-t border-slate-100 bg-white">
					<button 
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          onClick={async () => {
            onCheckout?.();
            nav("/checkout");
          }}
          >
						Checkout
					</button>
					<div className="mt-1 flex items-center justify-between text-xs text-slate-500">
						<span className="flex items-center gap-1">
							<ShieldCheck className="h-3.5 w-3.5" />
							Secure checkout
						</span>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
