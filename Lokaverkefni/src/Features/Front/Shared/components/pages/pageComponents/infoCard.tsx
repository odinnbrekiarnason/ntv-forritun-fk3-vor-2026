import type { ProductDetail } from "../../../Schemas/ProductsSchema";

type InfoCardProps = {
	specs: ProductDetail["specs"] | null | undefined;
	title?: string;
};

function formatLabel(key: string) {
	return key
		.replace(/_/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatValue(value: unknown) {
	if (value === null || value === undefined) {
		return "-";
	}

	if (typeof value === "boolean") {
		return value ? "Yes" : "No";
	}

	return String(value);
}

export function InfoCard({ specs, title = "Specifications" }: InfoCardProps) {
	if (!specs) {
		return null;
	}

	const entries = Object.entries(specs);

	if (entries.length === 0) {
		return null;
	}

	return (
		<div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
			<p className="mb-3 text-sm font-semibold text-slate-900">{title}</p>
			<div className="space-y-2">
				{entries.map(([key, value]) => (
					<div key={key} className="flex items-start justify-between gap-3 border-b border-slate-200 pb-2 last:border-0 last:pb-0">
						<span className="text-sm text-slate-600">{formatLabel(key)}</span>
						<span className="text-sm font-medium text-slate-800 text-right">{formatValue(value)}</span>
					</div>
				))}
			</div>
		</div>
	);
}
