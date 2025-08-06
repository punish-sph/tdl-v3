import React from "react";
import clsx from "clsx";

type BadgeVariant =
  | "emerald"
  | "white"
  | "black"
  | "light"
  | "sky"
  | "danger"
  | "gold";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  variant = "emerald",
  size = "md",
  className = "",
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    emerald: "text-lime-400 border-lime-400 dark:text-lime-300 dark:border-lime-300",
    white: "text-zinc-800 border-zinc-400 dark:text-zinc-100 dark:border-zinc-300",
    black: "text-black border-black dark:text-white dark:border-white",
    light: "text-zinc-500 border-zinc-400 dark:text-zinc-300 dark:border-zinc-500",
    sky: "text-sky-400 border-sky-400 dark:text-sky-300 dark:border-sky-300",
    danger: "text-red-500 border-red-500 dark:text-red-400 dark:border-red-400",
    gold: "text-amber-500 border-amber-500 dark:text-amber-400 dark:border-amber-400",
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <span
      className={clsx(
        "bg-transparent border-2 border-current inline-block",
        "rounded-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {text}
    </span>
  );
};

export default Badge;
