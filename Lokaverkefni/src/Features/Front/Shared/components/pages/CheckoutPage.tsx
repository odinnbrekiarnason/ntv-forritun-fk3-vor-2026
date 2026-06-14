import { getUserFrontEnd } from "@/Features/Front/Hooks/useAPI/get/getUser";
import { useUser } from "@clerk/react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function CheckoutPage() {
	const { user, isLoaded, isSignedIn } = useUser();
  const nav = useNavigate();
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		if (!isSignedIn || !user) {
			nav("/home");
			return;
		}

		const loadUser = async () => {
			const dbUser = await getUserFrontEnd(user.id);
			const fallbackEmail = user.emailAddresses[0]?.emailAddress ?? "";
			setEmail(dbUser?.email ?? fallbackEmail);
		};

		void loadUser();
	}, [isLoaded, isSignedIn, nav, user]);

	if (!isLoaded) {
		return <div className="mx-auto mt-8 max-w-4xl text-sm text-slate-600">Loading checkout...</div>;
	}

	if (!isSignedIn || !user) {
		return null;
	}

  
	return (
		<section className="mx-auto mt-8 mb-16 min-h-screen max-w-4xl rounded-2xl border border-slate-200 bg-accent p-6 shadow-md sm:p-8">
			<div className="mb-6 border-b border-slate-200 pb-4">
				<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Checkout</p>
				<h1 className="mt-2 text-3xl font-bold text-slate-900">Payment Details</h1>
				<p className="mt-2 text-sm text-slate-600">Enter your card and billing details to complete your purchase.</p>
			</div>

			<form className="space-y-6" noValidate>
				<div className="rounded-xl border border-slate-200 bg-transparent p-5 sm:p-6">
					<h2 className="text-lg font-semibold text-slate-900">Card Information</h2>

					<div className="mt-4 grid grid-cols-1 gap-4">
						<div>
							<label htmlFor="cardName" className="mb-1.5 block text-sm font-medium text-slate-700">
								Name on card
							</label>
							<input
								id="cardName"
								name="cardName"
								type="text"
								required
								autoComplete="cc-name"
								placeholder="John Smith"
								className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
							/>
						</div>

						<div>
							<label htmlFor="cardNumber" className="mb-1.5 block text-sm font-medium text-slate-700">
								Card number
							</label>
							<input
								id="cardNumber"
								name="cardNumber"
								type="text"
								required
								autoComplete="cc-number"
								inputMode="numeric"
								placeholder="1234 5678 9012 3456"
								className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
							/>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
							<div className="sm:col-span-1">
								<label htmlFor="expiry" className="mb-1.5 block text-sm font-medium text-slate-700">
									Expiry
								</label>
								<input
									id="expiry"
									name="expiry"
									type="text"
									required
									autoComplete="cc-exp"
									placeholder="MM/YY"
									className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
								/>
							</div>

							<div className="sm:col-span-1">
								<label htmlFor="cvc" className="mb-1.5 block text-sm font-medium text-slate-700">
									CVC
								</label>
								<input
									id="cvc"
									name="cvc"
									type="password"
									required
									autoComplete="cc-csc"
									inputMode="numeric"
									placeholder="123"
									className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="rounded-xl border border-slate-200 bg-transparent p-5 sm:p-6">
					<h2 className="text-lg font-semibold text-slate-900">Billing Address</h2>

					<div className="mt-4 grid grid-cols-1 gap-4">
						<div>
							<label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								value={email}
								readOnly
								className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
							/>
						</div>

						<div>
							<label htmlFor="addressLine1" className="mb-1.5 block text-sm font-medium text-slate-700">
								Address line 1
							</label>
							<input
								id="addressLine1"
								name="addressLine1"
								type="text"
								required
								autoComplete="address-line1"
								placeholder="Street and house number"
								className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
							/>
						</div>

						<div>
							<label htmlFor="addressLine2" className="mb-1.5 block text-sm font-medium text-slate-700">
								Address line 2 (optional)
							</label>
							<input
								id="addressLine2"
								name="addressLine2"
								type="text"
								autoComplete="address-line2"
								placeholder="Apartment, suite, etc."
								className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
							/>
						</div>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
							<div>
								<label htmlFor="city" className="mb-1.5 block text-sm font-medium text-slate-700">
									Country
								</label>
								<input
									id="city"
									name="city"
									type="text"
									required
									autoComplete="address-level2"
									className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
								/>
							</div>
							<div>
								<label htmlFor="state" className="mb-1.5 block text-sm font-medium text-slate-700">
									State / Region
								</label>
								<input
									id="state"
									name="state"
									type="text"
									required
									autoComplete="address-level1"
									className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
								/>
							</div>
							<div>
								<label htmlFor="country" className="mb-1.5 block text-sm font-medium text-slate-700">
									City
								</label>
								<input
									id="country"
									name="country"
									type="text"
									required
									autoComplete="country-name"
									className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-end gap-3">
					<button
						type="button"
						className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
					>
						Cancel
					</button>
					<button
						type="button"
						className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
					>
						Pay now
					</button>
				</div>
			</form>
		</section>
	);
}
