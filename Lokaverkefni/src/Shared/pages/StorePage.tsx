import { useState } from "react";
import type { Product } from "../Schemas/ProductsSchema";

export function StorePage() {
  const [data, setData] = useState<Product[]>([]);

  return (
    <div>
    </div>
  )
}