import { getAllProductsFrontend } from "@/Features/Front/useAPI/get/getProducts";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "../Schemas/ProductsSchema";
import { ProductCard } from "./pageComponents/productCard";

const categories = ["All", "GPU", "CPU", "RAM", "Storage", "Power Supply", "CPU Cooler"] as const;

export function StorePage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>(
    "All"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const data = await getAllProductsFrontend();
      setProducts(Array.isArray(data) ? data : []);
      setIsLoading(false);
    };

    void loadProducts();
  }, []);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") {
      return products;
    }

    return products.filter((item) => item.type === activeCategory);
  }, [activeCategory, products]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6f8ff_0%,#edf4ff_45%,#f5f7ff_100%)] px-4 py-8 text-left sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-lg shadow-slate-200/40 backdrop-blur sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Custom PC Parts
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Build Your Next Rig
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            A basic storefront layout with categories and product cards. Hook your
            backend data into this later.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition self-center ${
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </div>
  );
}