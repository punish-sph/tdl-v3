import React from "react";
import clsx from "clsx";
import Label from "@/Components/atoms/Label";

export default function FileField({
    label,
    name,
    id,
    onChange,
    currentFile,
    error,
    required = false,
    accept = ".pdf,.jpg,.jpeg,.png",
    maxSize = "2MB",
    disabled = false,
    className = "",
    ...props
}) {
    const baseInputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition duration-200 ease-in-out file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-50 file:text-lime-700 hover:file:bg-lime-100";
    
    const inputClasses = clsx(
        baseInputClass,
        disabled && "bg-gray-100 cursor-not-allowed file:bg-gray-100 file:text-gray-500",
        error && "border-red-500 focus:ring-red-500",
        className
    );

    return (
        <div className="mb-4">
            <Label id={id || name}>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <input
                type="file"
                name={name}
                id={id || name}
                accept={accept}
                onChange={onChange}
                disabled={disabled}
                className={inputClasses}
                {...props}
            />
            <div className="mt-1 text-xs text-gray-500">
                Format: {accept.replace(/\./g, '').toUpperCase()} • Maksimal: {maxSize}
            </div>
            {currentFile && (
                <div className="mt-1 text-sm text-lime-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    File terpilih: {currentFile.name}
                </div>
            )}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}