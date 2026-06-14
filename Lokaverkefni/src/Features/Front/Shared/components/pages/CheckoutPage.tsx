import { getUserFrontEnd } from "@/Features/Front/Hooks/useAPI/get/getUser";
import { useUser } from "@clerk/react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { CheckoutInput } from "./pageComponents/input";
import { UseCartShop } from "@/Features/Front/Cart/Shop/CartShop";

export function CheckoutPage() {
	const { user, isLoaded, isSignedIn } = useUser();
	const [email, setEmail] = useState("");
  const { completePurchase } = UseCartShop();
  const nav = useNavigate();

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
		<section className="mx-auto mt-8 mb-16 min-h-screen max-w-4xl rounded-2xl border border-slate-200 bg-transparent p-6 shadow-md sm:p-8">
			<div className="mb-6 border-b border-slate-200 pb-4">
				<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Checkout</p>
				<h1 className="mt-2 text-3xl font-bold text-slate-900">Payment Details</h1>
				<p className="mt-2 text-sm text-slate-600">Enter your card and billing details to complete your purchase.</p>
			</div>

			<form className="space-y-6" noValidate>
				<div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
					<h2 className="text-lg font-semibold text-slate-900">Card Information</h2>

					<div className="mt-4 grid grid-cols-1 gap-4">
						<CheckoutInput
							id="cardName"
							name="cardName"
							label="Name on card"
							type="text"
							required
							autoComplete="cc-name"
							placeholder="John Smith"
						/>

						<CheckoutInput
							id="cardNumber"
							name="cardNumber"
							label="Card number"
							type="text"
							required
							autoComplete="cc-number"
							inputMode="numeric"
							placeholder="1234 5678 9012 3456"
						/>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
							<CheckoutInput
								id="expiry"
								name="expiry"
								label="Expiry"
								type="text"
								required
								autoComplete="cc-exp"
								placeholder="MM/YY"
								containerClassName="sm:col-span-1"
							/>

							<CheckoutInput
								id="cvc"
								name="cvc"
								label="CVC"
								type="password"
								required
								autoComplete="cc-csc"
								inputMode="numeric"
								placeholder="123"
								containerClassName="sm:col-span-1"
							/>
						</div>
					</div>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
					<h2 className="text-lg font-semibold text-slate-900">Billing Address</h2>

					<div className="mt-4 grid grid-cols-1 gap-4">
						<CheckoutInput
							id="email"
							name="email"
							label="Email"
							type="email"
							value={email}
							readOnly
						/>

						<CheckoutInput
							id="addressLine1"
							name="addressLine1"
							label="Address line 1"
							type="text"
							required
							autoComplete="address-line1"
							placeholder="Street and house number"
						/>

						<CheckoutInput
							id="addressLine2"
							name="addressLine2"
							label="Address line 2 (optional)"
							type="text"
							autoComplete="address-line2"
							placeholder="Apartment, suite, etc."
						/>

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
							<CheckoutInput
								id="city"
								name="city"
								label="City"
								type="text"
								required
								autoComplete="address-level2"
							/>
							<CheckoutInput
								id="state"
								name="state"
								label="State / Region"
								type="text"
								required
								autoComplete="address-level1"
							/>
							<CheckoutInput
								id="country"
								name="country"
								label="Country"
								type="text"
								required
								autoComplete="country-name"
							/>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-end gap-3">
					<button
						type="button"
						className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
            onClick={() => nav("/")}
					>
						Cancel
					</button>
					<button
						className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            onClick={() => {
              console.log("Completing purchase for user:", user!.id);
              const test = completePurchase(user!.id, UseCartShop().items);
              console.log(test);
              completePurchase(user!.id, UseCartShop().items);
            }}
					>
						Pay now
					</button>
				</div>
			</form>
		</section>
	);
}
