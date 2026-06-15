import { getUserOrders } from "@/Features/Front/Hooks/useAPI/get/getUserOrders";
import { useEffect, useState } from "react";
import { UserProfile, useUser } from "@clerk/react";

type UserOrder = {
	orderId: string;
	status: string;
	totalPrice: number;
	finishedAt: string;
	items: {
		productId: string;
		name: string;
		image: string;
		type: string;
		unitPrice: number;
		quantity: number;
	}[];
};

export const UserPage = () => {
	const { user, isLoaded } = useUser();
	const [orders, setOrders] = useState<UserOrder[]>([]);
	const [ordersLoading, setOrdersLoading] = useState(false);
	const [ordersError, setOrdersError] = useState<string | null>(null);

	useEffect(() => {
		if (!user?.id) {
			setOrders([]);
			return;
		}

		const loadOrders = async () => {
			try {
				setOrdersLoading(true);
				setOrdersError(null);
				const userOrders = await getUserOrders(user.id);
				setOrders(userOrders as UserOrder[]);
			} catch {
				setOrdersError("Could not load order history right now.");
			} finally {
				setOrdersLoading(false);
			}
		};

		void loadOrders();
	}, [user?.id]);
  
  if(!isLoaded) {
    return <div>Loading...</div>;
  }
  if(!user) {
    return <div>User not found <nav >home</nav></div>;
  }

	return (
		<section className="mx-auto mt-8 mb-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
			<div className="overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-slate-100 shadow-sm">
				<div className="border-b border-slate-200 px-6 py-8 sm:px-8">
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
						Account
					</p>
					<p className="mt-2 text-3xl font-bold text-slate-600">User Profile</p>
					<p className="mt-2 text-sm text-slate-600">
						Manage your account details, security settings and connected services.
					</p>
					{user?.primaryEmailAddress?.emailAddress && (
						<p className="mt-3 inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
							Signed in as {user.primaryEmailAddress.emailAddress}
						</p>
					)}

					<div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
						<div className="flex items-center justify-between gap-3">
							<p className="text-sm font-semibold text-slate-900">Order History</p>
							<span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
								{orders.length} orders
							</span>
						</div>

						{ordersLoading && (
							<p className="mt-3 text-sm text-slate-600">Loading order history...</p>
						)}

						{!ordersLoading && ordersError && (
							<p className="mt-3 text-sm text-rose-600">{ordersError}</p>
						)}

						{!ordersLoading && !ordersError && orders.length === 0 && (
							<p className="mt-3 text-sm text-slate-600">No orders yet.</p>
						)}

						{!ordersLoading && !ordersError && orders.length > 0 && (
							<div className="mt-3 space-y-2">
								{orders.slice(0, 3).map((order) => (
									<div
										key={order.orderId}
										className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
									>
										<div className="flex items-center justify-between gap-3">
											<p className="text-sm font-medium text-slate-800">Order #{order.orderId}</p>
											<p className="text-sm font-semibold text-slate-900">${order.totalPrice}</p>
										</div>
										<p className="mt-1 text-xs text-slate-600">
											{order.items.length} items | {order.status}
										</p>
									</div>
								))}
							</div>
						)}
					</div>
				</div>				
					<div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 sm:p-4">
						<div className="overflow-x-auto">
							<UserProfile />
					</div>
				</div>
			</div>
		</section>
	);
};
