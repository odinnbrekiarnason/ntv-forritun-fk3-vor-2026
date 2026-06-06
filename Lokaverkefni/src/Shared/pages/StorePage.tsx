import { useMemo, useState } from "react";

type StoreItem = {
  id: number;
  name: string;
  category: "GPU" | "CPU" | "RAM" | "Storage";
  price: string;
  image: string;
  badge?: string;
};

const categories = ["All", "GPU", "CPU", "RAM", "Storage"] as const;

const demoProducts: StoreItem[] = [
  {
    id: 1,
    name: "GeForce RTX 4090",
    category: "GPU",
    price: "$1,499",
    image:
      "https://images.nvidia.com/aem-dam/Solutions/geforce/ada/rtx-4090/geforce-rtx-4090-product-gallery-thumbnail-267-1.jpg",
    badge: "Flagship",
  },
  {
    id: 2,
    name: "Radeon RX 7900 XTX",
    category: "GPU",
    price: "$999",
    image: "https://www.amd.com/content/dam/amd/en/images/products/graphics/2648997-amd-radeon-7900xtx.jpg",
  },
  {
    id: 3,
    name: "Ryzen 9 7950X",
    category: "CPU",
    price: "$699",
    image: "https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-9-7900x.jpg",
    badge: "Hot",
  },
  {
    id: 4,
    name: "Core i9-13900K",
    category: "CPU",
    price: "$599",
    image: "https://m.media-amazon.com/images/I/61My4F2-XUL._AC_SL1500_.jpg",
  },
  {
    id: 5,
    name: "Corsair Vengeance 16GB",
    category: "RAM",
    price: "$89",
    image:
      "https://assets.corsair.com/image/upload/c_pad,q_85,h_926,w_926,f_auto/products/Memory/CMW16GX4M2C3200C16/Gallery/Vengeance_RGB_Pro_01.webp",
  },
  {
    id: 6,
    name: "Samsung 970 EVO 1TB",
    category: "Storage",
    price: "$149",
    image: "https://placehold.co/900x600/14532d/ffffff?text=Samsung+970+EVO+1TB",
  },
];

export function StorePage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>(
    "All"
  );

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") {
      return demoProducts;
    }

    return demoProducts.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

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
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-52 bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                {product.badge ? (
                  <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-900">
                    {product.badge}
                  </span>
                ) : null}
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {product.category}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-slate-900">
                      {product.name}
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
          ))}
        </section>
      </div>
    </div>
  );
}