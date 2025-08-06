import React from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Label from "@/components/atoms/Label";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label: string;
  name: string;
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export default function SelectField({
  label,
  name,
  id,
  value,
  onChange,
  options,
  error,
  required = false,
  placeholder = "Pilih opsi...",
  disabled = false,
  className = "",
}: SelectFieldProps) {
  const selectClasses = clsx(
    "w-full px-4 py-2 text-sm font-mono bg-black text-white",
    "border border-gray-700 appearance-none",
    "focus:outline-none focus:ring-0 focus:border-lime-500",
    "hover:border-lime-400 transition duration-150 ease-in-out",
    disabled && "bg-zinc-900 text-zinc-500 cursor-not-allowed",
    error && "border-red-500 focus:border-red-500",
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

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
