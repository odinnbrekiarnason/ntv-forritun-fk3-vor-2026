import type { Product } from "@/Features/Front/Shared/Schemas/ProductsSchema";
import Stock_noPhoto from "/images/Stock_noPhoto.png"
import { UseCartShop } from "@/Features/Front/Cart/Shop/CartShop";
import { useNavigate } from "react-router";
import { useAuth } from "@clerk/react";

export function ProductCard({ product }: { product: Product }) {
  const cartShop = UseCartShop();
  const nav = useNavigate();
  const auth = useAuth();
  const hasStock = product.stock > 0;

  return (
    <article
      key={product.id}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-52 bg-slate-100">
        <img
          src={product.img_url || Stock_noPhoto}
          alt={product.product_name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {product.type}
            </p>
            <h2 className="mt-1 text-slate-900 text-lg font-semibold">
              {product.product_name}
            </h2>
          </div>
          <p className="text-lg font-bold text-slate-900">{product.price}</p>
        </div>

        <div className="flex gap-2">
          {auth.isSignedIn &&
           <button
            type="button"
            disabled={!hasStock}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition ${
              hasStock ? "bg-slate-900 hover:bg-slate-700" : "bg-slate-400 cursor-not-allowed"
            }`}
            onClick={() => cartShop.addToCart(product.id, 1)}
          >
            Add To Cart
          </button>
          }
         
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
            onClick={() => {nav(`/products/${product.id}`)}}
          >
            Details
          </button>
        </div>
      </div>
    </article>
  )
}


