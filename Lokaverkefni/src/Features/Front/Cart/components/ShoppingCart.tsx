import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Features/Front/Shared/components/ui/card";
import { ShieldCheck, ShoppingCart as ShoppingCartIcon, Truck } from "lucide-react";

export function ShoppingCart() {
	return (
		<div className="w-full max-w-md">
			<Card className="overflow-hidden border border-slate-200 bg-white shadow-lg shadow-slate-300/40">
				<CardHeader className="border-b border-slate-100 pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2 text-slate-900">
							<ShoppingCartIcon className="h-4 w-4" />
							Your Cart
						</CardTitle>
						<span className="rounded-full bg-slate-900 px-2 py-1 text-xs font-semibold text-white">
							2 items
						</span>
					</div>
				</CardHeader>

				<CardContent className="space-y-3 py-4">
					<div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold text-slate-900">RTX 4070 Super</p>
							<p className="text-sm font-semibold text-slate-900">$699</p>
						</div>
						<p className="mt-1 text-xs text-slate-500">Qty: 1</p>
					</div>

					<div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
						<div className="flex items-center justify-between">
							<p className="text-sm font-semibold text-slate-900">DDR5 32GB Kit</p>
							<p className="text-sm font-semibold text-slate-900">$149</p>
						</div>
						<p className="mt-1 text-xs text-slate-500">Qty: 1</p>
					</div>
					<div className="space-y-2 border-t border-slate-100 pt-3 text-sm">
						<div className="flex items-center justify-between text-slate-600">
							<span>Subtotal</span>
							<span>$848</span>
						</div>
						<div className="flex items-center justify-between text-slate-600">
							<span>Shipping</span>
							<span>$0</span>
						</div>
						<div className="flex items-center justify-between text-base font-bold text-slate-900">
							<span>Total</span>
							<span>$848</span>
						</div>
					</div>
				</CardContent>

				<CardFooter className="flex-col items-stretch gap-2 border-t border-slate-100 bg-white">
					<button className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
						Checkout
					</button>
					<button className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-500">
						Continue Shopping
					</button>

					<div className="mt-1 flex items-center justify-between text-xs text-slate-500">
						<span className="flex items-center gap-1">
							<Truck className="h-3.5 w-3.5" />
							Free shipping over $200
						</span>
						<span className="flex items-center gap-1">
							<ShieldCheck className="h-3.5 w-3.5" />
							Secure checkout
						</span>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
