import React from "react";
import clsx from "clsx";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, id, className, ...props }) => {
  const baseClass = "block text-sm font-medium text-gray-200 mb-1";
  const classes = clsx(baseClass, className);

  return (
    <label htmlFor={id} className={classes} {...props}>
      {children}
    </label>
  );
};

export default Label;
