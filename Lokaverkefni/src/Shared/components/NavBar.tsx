import {SignInButton, SignUpButton, useAuth, useClerk} from "@clerk/react";

export function NavBar() {
	const { isSignedIn } = useAuth();
	const { signOut } = useClerk();

	return (
		<nav className="w-full border-b border-black-300 border-blue-700 px-6 py-4" >
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between">
				<h1 className="text-lg font-semibold tracking-tight text-white">Online Store</h1>

				<div className="flex items-center gap-3">
					{!isSignedIn && (
						<>
							<SignUpButton mode="modal">
								<button
									type="button"
									className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100"
								>
									Sign up
								</button>
							</SignUpButton>

							<SignInButton mode="modal">
								<button
									type="button"
									className="rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
								>
									Sign in
								</button>
							</SignInButton>
						</>
					)}

					{isSignedIn && (
						<button
							type="button"
							onClick={() => signOut({ redirectUrl: "/" })}
							className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-100"
						>
							Log out
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}
