import { Minus, Plus, Trash2 } from "lucide-react";
import { UseCartShop } from "../Shop/CartShop";

type CartItemProps = {
  id: string;
	name: string;
	price: number;
	quantity: number;
	imageUrl?: string;
};

export function CartItem({ name, price, quantity, imageUrl, id }: CartItemProps) {
  const {removeFromCart, changeQuantity} = UseCartShop();
	return (
		<article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
			<div className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-slate-100/30 to-transparent opacity-0 transition group-hover:opacity-100" />

			<div className="relative flex gap-3">
				<div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
					{imageUrl ? (
						<img src={imageUrl} alt={name} className="h-full w-full object-cover" />
					) : (
						<div className="flex h-full w-full items-center justify-center text-[11px] font-medium text-slate-500">
							No image
						</div>
					)}
				</div>

				<div className="min-w-0 flex-1">
					<div className="flex items-start justify-between gap-3">
						<h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{name}</h3>
						<p className="shrink-0 text-sm font-bold text-slate-900">Unit Cost ${price}</p>
					</div>

					<div className="mt-3 flex items-center justify-between">
						<div className="inline-flex items-center rounded-lg border border-slate-200 bg-white">
							<button type="button" className="p-1.5 text-slate-500 transition hover:text-slate-800" aria-label="Decrease quantity" onClick={() => changeQuantity(id, quantity - 1)}>
								<Minus className="h-3.5 w-3.5" />
							</button>
							<span className="min-w-8 px-2 text-center text-xs font-semibold text-slate-700">{quantity}</span>
							<button type="button" className="p-1.5 text-slate-500 transition hover:text-slate-800" aria-label="Increase quantity" onClick={() => changeQuantity(id, quantity + 1)}>
								<Plus className="h-3.5 w-3.5" />
							</button>
						</div>

						<button type="button" className="inline-flex items-center gap-1 rounded-lg border border-transparent px-2 py-1 text-xs font-medium text-rose-600 transition hover:border-rose-200 hover:bg-rose-50" aria-label="Remove item"
            onClick={() => removeFromCart(id)}
            >
							<Trash2 className="h-3.5 w-3.5" />
							Remove
						</button>
					</div>
				</div>
			</div>
		</article>
	);
}
