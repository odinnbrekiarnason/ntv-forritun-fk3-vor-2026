import { useEffect, useState } from "react";
import type { Product } from "../Schemas/ProductsSchema";
import { getProductByIdFrontend } from "../../useAPI/get/getProducts";
import StockNoPhoto from "/images/Stock_noPhoto.png";

type ProductPageProps = {
  productId: string;
};

export function ProductPage({ productId }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      const data = await getProductByIdFrontend(productId);
      setProduct(data ?? null);
      setIsLoading(false);
    };

    void loadProduct();
  }, [productId]);

  if (isLoading) {
    return <div className="min-h-[40vh] flex items-center justify-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="min-h-[40vh] flex items-center justify-center">Product not found.</div>;
  }

  return (
    <section className="mx-auto mt-8 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-slate-100">
          <img
            src={product.img_url || StockNoPhoto}
            alt={product.product_name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {product.type}
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{product.product_name}</h1>
          <p className="text-2xl font-semibold text-slate-900">${product.price}</p>
          <p className="text-sm text-slate-600">{product.description}</p>

          <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            Stock: {product.stock}
          </div>

          <button
            type="button"
            className="mt-2 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 sm:w-fit"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
}