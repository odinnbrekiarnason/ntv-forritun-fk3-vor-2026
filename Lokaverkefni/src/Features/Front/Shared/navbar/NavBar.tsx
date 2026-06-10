import { useAuth, useClerk} from "@clerk/react";
import { X } from "lucide-react";
import { useState } from "react";
import { ShoppingCartButton } from "../components/shoppingCartButton";
import { ProductPageButton } from "../components/productPageButton";
import { ShoppingCart } from "../../Cart/components/ShoppingCart";
import { Outlet, useNavigate } from "react-router-dom";

export function NavBar() {
	const { isSignedIn } = useAuth();
	const { signOut, openSignIn, openSignUp} = useClerk();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const nav = useNavigate();

	return (
		<>
		<nav className="w-full h-20 bg-accent px-4 py-2" >
			<div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-end">
				<h1 className="absolute left-1/2 top-0.5 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold leading-none tracking-tight text-white hover:cursor-pointer" onClick={() => nav("/")}>Online Store</h1>

				<div className="flex items-center gap-3">
					{!isSignedIn && (
						<>
								<button
									type="button"
									onClick={() => openSignUp()}
									className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
								>
									Sign up
								</button>
							<button
								type="button"
								onClick={() => openSignIn()}
								className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
							>
								Login
								</button>
						</>
					)}
					{isSignedIn && (
            <>
						  <button
						  	type="button"
						  	onClick={() => signOut({ redirectUrl: "/" })}
						  	className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
						  >
						  	Log out
						  </button>
              <ProductPageButton />
              <ShoppingCartButton onClick={() => setIsCartOpen(true)} />
            </>
					)}
				</div>
			</div>
		</nav>
		{isCartOpen && (
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<button
					type="button"
					onClick={() => setIsCartOpen(false)}
					className="absolute inset-0 bg-black/45"
					aria-label="Close cart modal"
				/>
				<div className="relative w-full max-w-lg">
					<button
						type="button"
						onClick={() => setIsCartOpen(false)}
						className="absolute right-3 top-3 z-10 rounded-full border border-slate-300 bg-white p-1.5 text-slate-600 transition hover:border-slate-500"
						aria-label="Close cart"
					>
						<X className="h-4 w-4" />
					</button>
					<ShoppingCart />
				</div>
			</div>
		)}
    <Outlet />
		</>
	);
}
