import type { Product } from "@/Features/Front/Shared/Schemas/ProductsSchema";
import Stock_noPhoto from "/images/Stock_noPhoto.png"

export function ProductCard({ product }: { product: Product }) {
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
              {product.product_name}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              {product.type}
            </p>

            <h2 className="mt-1 text-lg font-semibold text-slate-900">
              {product.product_name}
            </h2>
          </div>
          <p className="text-lg font-bold text-slate-900">{product.price}</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Add To Cart
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  )
}


