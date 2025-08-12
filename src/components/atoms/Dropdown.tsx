import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  label: React.ReactNode;
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const dropdownWidth = 128; // px (sesuai w-32 di Tailwind)
      if (rect.left + dropdownWidth > window.innerWidth) {
        setAlignRight(true);
      } else {
        setAlignRight(false);
      }
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative px-1 py-[1px] rounded hover:text-red-800 transition-colors duration-150
          after:absolute after:-bottom-[2px] after:left-0 after:right-0 after:h-[1.5px] after:bg-red-600 
          after:scale-x-0 after:origin-left after:transition-transform after:duration-150 hover:after:scale-x-100"
      >
        {label}
      </button>
      {open && (
        <div
          className={`absolute top-full mt-1 w-32 bg-black border border-red-600 rounded shadow-md z-50 text-red-400 text-xs font-mono
          ${alignRight ? "right-0" : "left-0"}`}
        >
          {items.map((item) => (
            <a
              key={item}
              href="#"
              className="block px-3 py-1 hover:text-red-800 transition cursor-pointer"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
