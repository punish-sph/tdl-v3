import React from "react";
import clsx from "clsx";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "primary" | "secondary" | "danger" | "warning" | "success" | "outline" | "ghost";
type ButtonTheme = "light" | "dark";
type ButtonSize = "sm" | "md" | "lg";
type ButtonRounded = "sm" | "md" | "lg" | "xl" | "full";
type ButtonWidth = "auto" | "full" | "fit";
type ButtonShadow = "none" | "sm" | "md" | "lg";
type ButtonAnimation = "bounce" | "pulse" | "slide" | "glow" | "lift" | "none";
type ButtonIconPosition = "left" | "right" | "top" | "bottom";
type ButtonSpinnerSize = "sm" | "md" | "lg";

interface ButtonProps {
  type?: ButtonType;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconPosition?: ButtonIconPosition;
  variant?: ButtonVariant;
  theme?: ButtonTheme;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  width?: ButtonWidth;
  shadow?: ButtonShadow;
  animation?: ButtonAnimation;
  className?: string;
  form?: string;
  active?: boolean;
  title?: string;
  iconClassName?: string;
  loadingSpinnerSize?: ButtonSpinnerSize;
  isFullWidth?: boolean;
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
  variant = "primary",
  theme = "light",
  size = "md",
  rounded = "md",
  width = "auto",
  shadow = "none",
  animation = "none",
  className = "",
  form,
  active = false,
  title,
  iconClassName = "",
  loadingSpinnerSize = "md",
  isFullWidth = false,
}) => {
  const baseClasses = "font-semibold transition-all flex items-center justify-center focus:outline-none relative overflow-hidden select-none";

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm min-h-[36px] gap-1.5",
    md: "px-4 py-2.5 text-base min-h-[44px] gap-2",
    lg: "px-6 py-3 text-lg min-h-[52px] gap-2.5",
  };

  const iconSizes: Record<ButtonSize, string> = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const spinnerSizes: Record<ButtonSpinnerSize, string> = {
    sm: "w-3.5 h-3.5 border-2",
    md: "w-4 h-4 border-2",
    lg: "w-5 h-5 border-2",
  };

  const roundedClasses: Record<ButtonRounded, string> = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const widthClasses: Record<ButtonWidth, string> = {
    auto: "w-auto",
    full: "w-full",
    fit: "w-fit",
  };

  const shadowClasses: Record<ButtonShadow, string> = {
    none: "",
    sm: "shadow-sm hover:shadow-md",
    md: "shadow-md hover:shadow-lg",
    lg: "shadow-lg hover:shadow-xl",
  };

  const variants: Record<ButtonTheme, Record<ButtonVariant, string>> = {
    light: {
      primary: "bg-sky-500 hover:bg-sky-600 text-white",
      secondary: "bg-gray-500 hover:bg-gray-600 text-white",
      danger: "bg-red-500 hover:bg-red-600 text-white",
      warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
      success: "bg-lime-500 hover:bg-lime-600 text-white",
      outline: "border-2 border-white text-white bg-transparent hover:bg-white hover:text-black",
      ghost: "bg-transparent",
    },
    dark: {
      primary: "bg-sky-600 hover:bg-sky-700 text-white",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white",
      danger: "bg-red-600 hover:bg-red-700 text-white",
      warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
      success: "bg-lime-600 hover:bg-lime-700 text-white",
      outline: "border-2 border-black text-black bg-transparent hover:bg-black hover:text-white",
      ghost: "border-2 border-lime-600 text-lime-600 bg-transparent hover:bg-lime-600 hover:text-white",
    },
  };

  const variantClasses = variants[theme]?.[variant] || variants.light.primary;
  const disabledClasses = disabled || isLoading ? "opacity-50 cursor-not-allowed" : "";

  const finalClasses = clsx(
    baseClasses,
    sizeClasses[size],
    roundedClasses[rounded],
    widthClasses[width],
    shadowClasses[shadow],
    variantClasses,
    disabledClasses,
    isFullWidth && "w-full",
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
    if (isLoading) {
      return (
        <div className="flex items-center justify-center gap-2">
          {renderLoadingSpinner()}
          {loadingText && <span>{loadingText}</span>}
        </div>
      );
    }

    const iconElement = Icon ? (
      <Icon className={clsx(iconSizes[size], iconClassName)} />
    ) : null;

    const textElement = children ? <span>{children}</span> : null;

    switch (iconPosition) {
      case "right":
        return (
          <>
            {textElement}
            {iconElement}
          </>
        );
      case "top":
        return (
          <div className="flex flex-col items-center gap-1">
            {iconElement}
            {textElement}
          </div>
        );
      case "bottom":
        return (
          <div className="flex flex-col items-center gap-1">
            {textElement}
            {iconElement}
          </div>
        );
      default:
        return (
          <>
            {iconElement}
            {textElement}
          </>
        );
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={finalClasses}
      form={form}
      title={title}
    >
      {renderContent()}
    </button>
  );
};

export default Button;