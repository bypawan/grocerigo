import React from "react";
import Link from "next/link";

import { Logo } from "@/components/ui/icons";
import { SidebarItems } from "./sidebarItems";

export const Sidebar = () => {
  return (
    <div className="row-start-1 row-end-3 border-r">
      <Link
        href="/store/dashboard"
        className="flex items-center justify-center mt-8 px-8"
      >
        <Logo />
      </Link>
      <div className="overflow-y-auto overflow-x-hidden flex-grow px-5 mt-5">
        <SidebarItems />
      </div>
    </div>
  );
};
