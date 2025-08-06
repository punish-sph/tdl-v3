import React, { ReactNode } from "react";
import clsx from "clsx";

type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "";
type TextAlign = "left" | "center" | "right" | "";
type TextColor =
  | "default"
  | "muted"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | string;

interface DescriptionProps {
  children: ReactNode;
  size?: TextSize;
  mdSize?: TextSize;
  align?: TextAlign;
  className?: string;
  color?: TextColor;
}

const Description: React.FC<DescriptionProps> = ({
  children,
  size = "",
  mdSize = "",
  align = "",
  className = "",
  color = "default",
}) => {
  const sizeStyles: Record<TextSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "": "",
  };

  const colorClasses: Record<string, string> = {
    default: "text-zinc-900 dark:text-zinc-100",
    muted: "text-zinc-500 dark:text-zinc-400",
    danger: "text-red-600 dark:text-red-400",
    success: "text-emerald-600 dark:text-emerald-400",
    warning: "text-amber-600 dark:text-amber-400",
    info: "text-sky-600 dark:text-sky-400",
  };

  const sizeClass = sizeStyles[size] || "";
  const mdSizeClass = mdSize ? `md:${sizeStyles[mdSize] || ""}` : "";

  const alignClass =
    align === "left"
      ? "text-left"
      : align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "";

  const colorClass =
    color in colorClasses ? colorClasses[color] : color; 

  return (
    <p
      className={clsx(
        "leading-relaxed",
        sizeClass,
        mdSizeClass,
        alignClass,
        colorClass,
        className
      )}
    >
      {children}
    </p>
  );
};

export default Description;
export type { DescriptionProps };
