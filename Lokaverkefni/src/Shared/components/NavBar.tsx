import {SignInButton, SignUpButton, useAuth, useClerk} from "@clerk/react";
import { useNavigate } from "react-router-dom";

export function NavBar() {
	const { isSignedIn } = useAuth();
	const { signOut } = useClerk();
  const nav = useNavigate();

	return (
		<nav className="w-full h-20 bg-accent rounded-2xl px-4 py-2" >
			<div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-end">
				<h1 className="absolute left-1/2 top-0.5 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold leading-none tracking-tight text-white">Online Store</h1>

				<div className="flex items-center gap-3">
					{!isSignedIn && (
						<>
							<SignUpButton mode="modal">
								<button
									type="button"
									className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
								>
									Sign up
								</button>
							</SignUpButton>

							<SignInButton mode="modal">
								<button
									type="button"
									className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
								>
									Sign in
								</button>
							</SignInButton>
						</>
					)}

					{isSignedIn && (
            <div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => signOut({ redirectUrl: "/" })}
							className="rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
						>
							Log out
						</button>
						<button onClick={() => nav("/products")} className="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ml-2">
              View Products
            </button>
            </div>
					)}
				</div>
			</div>
		</nav>
	);
}
