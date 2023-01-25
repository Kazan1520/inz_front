import {forwardRef, SelectHTMLAttributes} from "react";
import {Category} from "@/types";
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    error?: string;
    options?: Category[];
};


export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, defaultValue, ...props }, ref) => (
        <div>
            <label htmlFor={label} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                ref={ref}
                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                {...props}
                defaultValue={defaultValue}
            >
                {options?.map((option) => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    ));
