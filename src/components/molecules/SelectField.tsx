import React from "react";
import clsx from "clsx";
import Label from "@/Components/atoms/Label";

export default function SelectField({
    label,
    name,
    id,
    value,
    onChange,
    options = [],
    error,
    required = false,
    placeholder = "Pilih opsi...",
    disabled = false,
    className = "",
    ...props
}) {
    const baseSelectClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200 ease-in-out appearance-none";
    const selectClasses = clsx(
        baseSelectClass,
        disabled && "bg-gray-100 cursor-not-allowed",
        error && "border-red-500 focus:ring-red-500",
        className
    );

    return (
        <div className="mb-4">
            <Label id={id || name}>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <div className="relative">
                <select
                    name={name}
                    id={id || name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={selectClasses}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}