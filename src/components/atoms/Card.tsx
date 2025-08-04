import React, { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string;
  border?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "p-8",
  border = true,
}) => {
  const paddingClasses = {
    none: "",
    xs: "p-2",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
    "2xl": "p-10",
  };

  const paddingClass = 
    typeof padding === "string" && padding in paddingClasses 
      ? paddingClasses[padding as keyof typeof paddingClasses] 
      : padding;

  return (
    <div
      className={clsx(
        "bg-white rounded-3xl shadow-lg overflow-hidden",
        paddingClass,
        border && "border border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;