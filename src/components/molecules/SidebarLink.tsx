import React from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type SidebarItem = {
  key: string;
  name: string;
  url?: string;
  icon?: React.ReactNode;
  type: "folder" | "link";
  children?: SidebarItem[];
};

type SidebarLinkProps = {
  item: SidebarItem;
  level?: number;
  currentUrl?: string;
  onItemClick?: () => void;
  expandedItems?: Set<string>;
  onToggleExpanded?: (key: string) => void;
  className?: string;
};

export default function SidebarLink({
  item,
  level = 0,
  currentUrl = "",
  onItemClick,
  expandedItems = new Set(),
  onToggleExpanded,
  className = "",
}: SidebarLinkProps) {
  const isExpanded = expandedItems.has(item.key);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.url ? currentUrl === item.url || currentUrl.startsWith(item.url + "/") : false;

  const paddingClass = level === 0 ? "pl-3" : `pl-${level * 4}`;

  const handleToggleExpanded = () => {
    if (onToggleExpanded) {
      onToggleExpanded(item.key);
    }
  };

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  const baseClasses = "flex items-center gap-2 px-3 py-1.5 text-sm transition-colors border-l-2";
  const activeClasses = isActive
    ? "bg-lime-100 text-lime-700 font-medium border-lime-500"
    : "text-gray-700 hover:bg-lime-50 hover:text-lime-700 border-transparent";

  if (item.type === "folder") {
    return (
      <div className={clsx("space-y-1", className)}>
        <button
          onClick={handleToggleExpanded}
          className={clsx("w-full justify-between group", baseClasses, paddingClass, activeClasses)}
        >
          <div className="flex items-center gap-2">
            {item.icon}
            <span>{item.name}</span>
          </div>
          <ChevronRightIcon
            className={clsx(
              "w-4 h-4 text-gray-400 transition-transform duration-200",
              isExpanded && "rotate-90"
            )}
          />
        </button>

        {isExpanded && hasChildren && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => (
              <SidebarLink
                key={`${item.key}-${child.name}`}
                item={{
                  ...child,
                  key: `${item.key}-${child.name}`,
                  type: "link",
                }}
                level={level + 1}
                currentUrl={currentUrl}
                onItemClick={onItemClick}
                expandedItems={expandedItems}
                onToggleExpanded={onToggleExpanded}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.url || "#"}
      onClick={handleItemClick}
      className={clsx(baseClasses, paddingClass, activeClasses, className)}
    >
      {item.icon}
      <span>{item.name}</span>
    </a>
  );
}
