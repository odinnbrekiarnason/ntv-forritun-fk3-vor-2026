import { useNavigate } from "react-router"


export const ProductPageButton = () => {
  const nav = useNavigate();
  return (
    <button
      onClick={() => nav("/products")}
      className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
    >
     View Products
    </button>
  )
}