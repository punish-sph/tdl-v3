import React, { ReactNode } from "react";
import clsx from "clsx";

type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "";

type TextAlign = "left" | "center" | "right" | "";

interface DescriptionProps {
  children: ReactNode;
  size?: TextSize;
  mdSize?: TextSize;
  align?: TextAlign;
  className?: string;
}

const Description: React.FC<DescriptionProps> = ({
  children,
  size = "",
  mdSize = "",
  align = "",
  className = "",
}) => {
  const sizeStyles: Record<string, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const sizeClass = size ? sizeStyles[size] || "" : "";
  const mdSizeClass = mdSize ? `md:${sizeStyles[mdSize] || ""}` : "";

  const alignClass = align ? {
    "text-left": align === "left",
    "text-center": align === "center",
    "text-right": align === "right",
  } : {};

  return (
    <p
      className={clsx(
        "leading-relaxed",
        sizeClass,
        mdSizeClass,
        alignClass,
        className
      )}
    >
      {children}
    </p>
  );
};

export default Description;