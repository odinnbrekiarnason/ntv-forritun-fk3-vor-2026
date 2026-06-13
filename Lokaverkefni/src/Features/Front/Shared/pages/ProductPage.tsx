import { useEffect, useState } from "react";
import type { Product } from "../Schemas/ProductsSchema";
import { getProductByIdFrontend } from "../../useAPI/get/getProducts";
import StockNoPhoto from "/images/Stock_noPhoto.png";
import { useNavigate, useParams } from "react-router";
import { UseCartShop } from "../../Cart/Shop/CartShop";
import { useAuth } from "@clerk/react";

export function ProductPage() {
  const { productId } = useParams();
  const cartShop = UseCartShop();
  const auth = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

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
    return <div className="min-h-[40vh] flex items-center justify-center">
      <div>
        <p className="text-5xl text-red-500 font-semibold">ERROR 404</p>
          --- Product Not Found ---
        <div className="h-4" />
        <button 
        className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
        onClick={() => nav(-1)}> Go Back</button> 
      </div>
    </div>;
  }

  const gallery = [product.img_url, product.img_url2, product.img_url3].filter(
    (img): img is string => Boolean(img),
  );
  const hasStock = product.stock > 0;
  const isAvailable = product.is_available ?? hasStock;
  const reviewUrl = product.yt_review_url;

  return (
    <section className="mx-auto mt-8 mb-16 min-h-screen max-w-6xl rounded-2xl border border-slate-200 bg-accent p-6 shadow-md sm:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
            <img
              src={product.img_url || StockNoPhoto}
              alt={product.product_name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(gallery.length ? gallery : [StockNoPhoto, StockNoPhoto, StockNoPhoto]).map((img, idx) => (
              <div key={`${img}-${idx}`} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <img
                  src={img || StockNoPhoto}
                  alt={`${product.product_name} image ${idx + 1}`}
                  className="h-24 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {product.type}
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{product.product_name}</h1>
          <p className="text-2xl font-semibold text-green-500">${product.price}</p>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <p className="text-base leading-relaxed text-slate-700">{product.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Stock</p>
              <p>{product.stock}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Availability</p>
              <p className={isAvailable ? "text-emerald-700" : "text-rose-700"}>
                {isAvailable ? "In stock" : "Out of stock"}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Product ID</p>
              <p className="break-all">{product.id}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
              <p className="font-medium text-slate-900">Producer ID</p>
              <p className="break-all">{product.producer_id ?? "N/A"}</p>
            </div>
          </div>

          {reviewUrl && (
            <a
              href={reviewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
            >
              Watch Review
            </a>
          )}

          {auth.isSignedIn && (
            <button
              type="button"
              disabled={!hasStock}
              className="mt-1 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-fit"
              onClick={() => cartShop.addToCart(product.id, 1)}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </section>
  );
}