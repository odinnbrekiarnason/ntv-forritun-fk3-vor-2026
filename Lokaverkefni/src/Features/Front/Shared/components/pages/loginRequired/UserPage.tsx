import { UserProfile, useUser } from "@clerk/react";

export const UserPage = () => {
	const { user } = useUser();

	return (
		<section className="mx-auto mt-8 mb-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
			<div className="overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-slate-100 shadow-sm">
				<div className="border-b border-slate-200 px-6 py-8 sm:px-8">
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
						Account
					</p>
					<h1 className="mt-2 text-3xl font-bold text-slate-900">User Profile</h1>
					<p className="mt-2 text-sm text-slate-600">
						Manage your account details, security settings and connected services.
					</p>
					{user?.primaryEmailAddress?.emailAddress && (
						<p className="mt-3 inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
							Signed in as {user.primaryEmailAddress.emailAddress}
						</p>
					)}
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
