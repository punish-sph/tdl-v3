import React from "react";
import "remixicon/fonts/remixicon.css";

interface IconToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string; 
}

const IconToggle: React.FC<IconToggleProps> = ({ isOpen, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Menu"
      className={`
        md:hidden
        bg-transparent
        border border-zinc-700 dark:border-zinc-300
        text-lime-500 dark:text-lime-400
        text-3xl font-mono
        px-2 py-1
        rounded-none
        focus:outline-none focus:ring-2 focus:ring-lime-400
        transition
        ${className}
      `}
    >
      <i className={isOpen ? "ri-close-line" : "ri-menu-line"} />
    </button>
  );
};

export default IconToggle;
