import { getAllProductsFrontend } from "@/Features/Front/Hooks/useAPI/get/getProducts";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../Schemas/ProductsSchema";
import { ProductCard } from "./pageComponents/productCard";
import { SearchBar } from "@/Features/Front/Search/components/searchBar";

const categories = ["All", "GPU", "CPU", "RAM", "Storage", "Power Supply", "CPU Cooler"] as const;

export function StorePage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>(
    "All"
  );
  const [searchTerm, setSearchTerm] = useState("");
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
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return products.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.type === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.product_name.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch) ||
        item.type.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, searchTerm]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen px-4 py-8 text-left sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-3xl border border-slate-200/70 bg-gray-700/50 p-6 shadow-lg shadow-slate-200/40 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Custom PC Parts
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Build Your Next Rig
          </h1>
          <div className="mt-6 flex flex-wrap gap-2 text-2xl">
            Categories:
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
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
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