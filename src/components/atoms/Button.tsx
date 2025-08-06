import React from "react";
import clsx from "clsx";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "emerald" | "sky" | "red" | "zinc" | "amber" | "purple";
type ButtonSize = "sm" | "md" | "lg";
type ButtonWidth = "auto" | "full" | "fit";
type ButtonSpinnerSize = "sm" | "md" | "lg";

interface ButtonProps {
  type?: ButtonType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconPosition?: "left" | "right";
  variant?: ButtonVariant;
  size?: ButtonSize;
  width?: ButtonWidth;
  className?: string;
  title?: string;
  iconClassName?: string;
  loadingSpinnerSize?: ButtonSpinnerSize;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
  children,
  icon: Icon,
  iconPosition = "left",
  variant = "emerald",
  size = "md",
  width = "auto",
  className = "",
  title,
  iconClassName = "",
  loadingSpinnerSize = "md",
}) => {
  const sizeClasses: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-1 gap-1",
    md: "text-sm px-4 py-1.5 gap-2",
    lg: "text-base px-5 py-2 gap-2.5",
  };

  const widthClasses: Record<ButtonWidth, string> = {
    auto: "w-auto",
    full: "w-full",
    fit: "w-fit",
  };

  const spinnerSizes: Record<ButtonSpinnerSize, string> = {
    sm: "w-3.5 h-3.5 border-2",
    md: "w-4 h-4 border-2",
    lg: "w-5 h-5 border-2",
  };

  const variantClasses: Record<ButtonVariant, string> = {
    emerald: "text-lime-500 border-lime-500 dark:text-lime-400 dark:border-lime-400",
    sky: "text-sky-500 border-sky-500 dark:text-sky-400 dark:border-sky-400",
    red: "text-red-500 border-red-500 dark:text-red-400 dark:border-red-400",
    zinc: "text-zinc-700 border-zinc-500 dark:text-zinc-200 dark:border-zinc-400",
    amber: "text-amber-500 border-amber-500 dark:text-amber-400 dark:border-amber-400",
    purple: "text-purple-500 border-purple-500 dark:text-purple-500 dark:border-purple-500",
  };

  const iconSizes: Record<ButtonSize, string> = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const finalClasses = clsx(
    "inline-flex items-center justify-center",
    "border-2 bg-transparent rounded-none font-mono font-semibold select-none",
    "transition-all duration-150 focus:outline-none",
    sizeClasses[size],
    widthClasses[width],
    variantClasses[variant],
    (disabled || isLoading) && "opacity-50 cursor-not-allowed",
    className
  );

  const renderLoadingSpinner = () => (
    <div
      className={clsx(
        "animate-spin rounded-full border-2 border-t-transparent border-current",
        spinnerSizes[loadingSpinnerSize]
      )}
    />
  );

  const renderContent = () => {
    const iconElement = Icon ? (
      <Icon className={clsx(iconSizes[size], iconClassName)} />
    ) : null;

    const textElement = isLoading ? (
      <span>{loadingText}</span>
    ) : (
      <span>{children}</span>
    );

    return (
      <>
        {isLoading && renderLoadingSpinner()}
        {iconPosition === "left" && iconElement}
        {textElement}
        {iconPosition === "right" && iconElement}
      </>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={finalClasses}
      title={title}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
