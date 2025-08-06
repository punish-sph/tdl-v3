import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  className,
  ...props
}) => {
  const baseClass =
    "w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out";
  const classes = clsx(baseClass, className);

  return (
    <input
      {...props}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      className={classes}
    />
  );
};

export default Input;
