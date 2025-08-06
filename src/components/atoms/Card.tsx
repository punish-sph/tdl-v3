import React, { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | string;
  border?: boolean;
  borderColor?: "default" | "danger" | "success" | "info" | "warning" | "purple" | string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  border = true,
  borderColor = "default",
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

  const borderColorClasses: Record<string, string> = {
    default: "border-zinc-800 dark:border-zinc-300",
    danger: "border-red-600 dark:border-red-400",
    success: "border-emerald-600 dark:border-emerald-400",
    info: "border-sky-600 dark:border-sky-400",
    warning: "border-amber-600 dark:border-amber-400",
    purple: "border-purple-600 dark:border-purple-500",
  };

  const paddingClass =
    typeof padding === "string" && padding in paddingClasses
      ? paddingClasses[padding as keyof typeof paddingClasses]
      : padding;

  const borderClass =
    typeof borderColor === "string" && borderColor in borderColorClasses
      ? borderColorClasses[borderColor]
      : borderColor;

  return (
    <div
      className={clsx(
        "bg-transparent rounded-none font-mono",
        paddingClass,
        border && ["border-2", borderClass],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
