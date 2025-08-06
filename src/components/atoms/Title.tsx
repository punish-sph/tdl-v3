import React from "react";
import clsx from "clsx";

type TextSize = 
  | "xs" | "sm" | "base" | "md" | "lg" 
  | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

type TextAlign = "left" | "center" | "right";

interface TitleProps {
  text?: string;
  highlight?: string;
  size?: TextSize;
  mdSize?: TextSize;
  align?: TextAlign;
  className?: string;
  children?: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({
  text = "",
  highlight = "",
  size = "base",
  mdSize = "",
  align = "left",
  className = "",
  children,
}) => {
  const textSizes: Record<TextSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
    "2xl": "text-3xl",
    "3xl": "text-4xl",
    "4xl": "text-5xl",
    "5xl": "text-6xl",
    "6xl": "text-7xl",
  };

  const titleText = text || (typeof children === "string" ? children : "");
  
  const parts = highlight && titleText
    ? titleText.split(new RegExp(`(${highlight})`, "gi"))
    : [titleText];

  return (
    <div
      className={clsx(
        "font-bold text-gray-200",
        textSizes[size],
        mdSize && `md:${textSizes[mdSize]}`,
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },
        className
      )}
    >
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="text-purple-500 dark:text-purple-400">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
      {children && typeof children !== "string" && children}
    </div>
  );
};

export default Title;
export type { TitleProps };