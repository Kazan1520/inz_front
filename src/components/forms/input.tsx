import {forwardRef, InputHTMLAttributes} from "react";
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
};


export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => (
        <div className="pt-1">
            <label htmlFor={label} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                ref={ref}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...props}
            />
            {error && (
                <p className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
));

