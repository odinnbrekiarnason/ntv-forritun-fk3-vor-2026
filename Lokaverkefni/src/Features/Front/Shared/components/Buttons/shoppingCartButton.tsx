import { ShoppingCart } from "lucide-react";

interface ShoppingCartButtonProps {
  onClick: () => void;
}

export function ShoppingCartButton({ onClick }: ShoppingCartButtonProps) {
  return (
    <div className="flex">
      <button
        type="button"
        onClick={onClick}
        aria-label="Open cart"
        className="rounded-full border border-slate-300 bg-white p-1.5 text-slate-700 shadow-sm transition hover:border-slate-500 hover:bg-slate-50"
      >
        <ShoppingCart className="h-4 w-4" />
      </button>
    </div>
  )
}