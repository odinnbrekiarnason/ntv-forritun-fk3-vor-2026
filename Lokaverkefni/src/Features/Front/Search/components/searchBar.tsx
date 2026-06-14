type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = "Search products..." }: SearchBarProps) {
	return (
		<div className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
			<span className="text-slate-400" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
					<path
						d="M21 21l-4.35-4.35m1.85-5.15a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
			<input
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className="w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
			/>
		</div>
	);
}
