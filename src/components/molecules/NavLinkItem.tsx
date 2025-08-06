import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type NavChild = {
  id?: string | number;
  name: string;
  url: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

type NavLinkItemProps = {
  name: string;
  url: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  activeClass?: string;
  inactiveClass?: string;
  children?: NavChild[];
  dropdownClass?: string;
  isDropdown?: boolean;
  isMobile?: boolean;
  currentUrl: string;
};

export default function NavLinkItem({
  name,
  url,
  icon,
  onClick,
  className = "",
  activeClass = "",
  inactiveClass = "",
  children = [],
  dropdownClass = "",
  isDropdown = false,
  isMobile = false,
  currentUrl,
}: NavLinkItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isActive =
    currentUrl === url || children?.some((child) => currentUrl === child.url);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    if (!isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile]);

  const handleToggleDropdown = (e: React.MouseEvent) => {
    if (isDropdown && children.length > 0) {
      e.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
    onClick?.(e);
  };

  const baseClasses = clsx(
    "flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-mono",
    "transition-all duration-150",
    "hover:border-lime-400 hover:text-lime-400",
    isActive ? "border-lime-500 text-lime-400" : "text-gray-300",
    className
  );

  const dropdownContainerClasses = clsx(
    "absolute left-0 mt-1 w-full z-50 border border-lime-400 bg-black",
    "transition-all origin-top text-sm font-mono",
    isDropdownOpen
      ? "opacity-100 scale-100 visible"
      : "opacity-0 scale-95 invisible",
    dropdownClass
  );

  const dropdownItemClass = (active: boolean) =>
    clsx(
      "flex items-center gap-2 px-4 py-2 border-b border-gray-700 transition-colors",
      active ? "text-lime-400 border-lime-400" : "text-gray-300 hover:text-lime-300"
    );

  if (!isDropdown || children.length === 0) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {icon && <span className="w-5 h-5">{icon}</span>}
        <span>{name}</span>
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleToggleDropdown} className={baseClasses}>
        <div className="flex items-center gap-2">
          {icon && <span className="w-5 h-5">{icon}</span>}
          <span>{name}</span>
        </div>
        <ChevronDownIcon
          className={clsx(
            "w-4 h-4 transition-transform duration-200",
            isDropdownOpen && "rotate-180"
          )}
        />
      </button>

      {!isMobile && (
        <div className={dropdownContainerClasses}>
          {children.map((child) => (
            <button
              key={child.id || child.url}
              onClick={() => {
                setIsDropdownOpen(false);
                child.onClick?.();
              }}
              className={dropdownItemClass(currentUrl === child.url)}
            >
              {child.icon && <span className="w-4 h-4">{child.icon}</span>}
              <span>{child.name}</span>
            </button>
          ))}
        </div>
      )}

      {isMobile && isDropdownOpen && (
        <div className={clsx("mt-1 ml-4 space-y-1", dropdownClass)}>
          {children.map((child) => (
            <button
              key={child.id || child.url}
              onClick={() => {
                setIsDropdownOpen(false);
                child.onClick?.();
              }}
              className={dropdownItemClass(currentUrl === child.url)}
            >
              {child.icon && <span className="w-4 h-4">{child.icon}</span>}
              <span>{child.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
