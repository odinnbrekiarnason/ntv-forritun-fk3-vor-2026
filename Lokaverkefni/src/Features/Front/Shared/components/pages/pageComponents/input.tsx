import type { InputHTMLAttributes } from "react";

type CheckoutInputProps = InputHTMLAttributes<HTMLInputElement> & {
	id: string;
	label: string;
	containerClassName?: string;
};

export function CheckoutInput({
	id,
	label,
	containerClassName,
	className,
	...inputProps
}: CheckoutInputProps) {
	return (
		<div className={containerClassName}>
			<label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
				{label}
			</label>
			<input
				id={id}
				className={
					className ??
					"w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500"
				}
				{...inputProps}
			/>
		</div>
	);
}
