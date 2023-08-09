import React from "react";

import { Logo } from "@/components/ui/icons";
import { SidebarItems } from "./sidebarItems";

export const Sidebar = () => {
  return (
    <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
      <div className="flex items-center justify-center px-5 border-b">
        <Logo />
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <SidebarItems />
      </div>
    </div>
  );
};
