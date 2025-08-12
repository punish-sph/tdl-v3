import React from "react";
import { BellIcon, UserIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Dropdown from "@/components/atoms/Dropdown";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-zinc-950 text-zinc-300 h-8 flex items-center font-mono text-xs select-none fixed w-full px-2">
      {/* Left Menu */}
      <div className="flex items-center space-x-2">
        <Dropdown label="File" items={["New", "Open", "Save", "Exit"]} />
        <Dropdown label="Edit" items={["Undo", "Redo", "Cut", "Copy", "Paste"]} />
        <Dropdown label="View" items={["Zoom In", "Zoom Out", "Full Screen"]} />
        <Dropdown label="Go" items={["Back", "Forward", "Go to File"]} />
        <Dropdown label="Run" items={["Run", "Debug", "Stop"]} />
        <Dropdown label="Term" items={["New Terminal", "Kill Terminal"]} />
        <Dropdown label="Help" items={["Docs", "About", "Support"]} />
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Right Menu */}
      <div className="flex items-center space-x-2">
        <Dropdown label={<BellIcon className="w-4 h-4" />} items={["No new notifications"]} />
        <Dropdown label={<UserIcon className="w-4 h-4" />} items={["Profile", "Settings", "Logout"]} />
        <Dropdown label={<Bars3Icon className="w-4 h-4" />} items={["Settings", "Profile", "Logout"]} />
      </div>
    </nav>
  );
};

export default Navbar;
