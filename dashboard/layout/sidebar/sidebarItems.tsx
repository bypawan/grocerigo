"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Menuitems from "./menuItems";

export const SidebarItems = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col py-4 space-y-1">
      {Menuitems.map((item) => {
        return item.navLabel ? (
          <li className="px-5" key={item.id}>
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500 uppercase">
                {item.title}
              </div>
            </div>
          </li>
        ) : item.navItem ? (
          <li key={item.id}>
            <Link
              href={item.href}
              className={`flex flex-row items-center h-12 hover:bg-gray-50 hover:text-[#009d63] transition-all duration-300 rounded-lg ${
                pathname === item.href
                  ? "text-[#009d63] bg-gray-100 font-bold"
                  : "text-gray-600"
              }`}
            >
              <span className="inline-flex justify-c9enter items-center ml-4">
                {item.icon}
              </span>
              <span className="ml-2 text-md tracking-wide truncate">
                {item.title}
              </span>
            </Link>
          </li>
        ) : null;
      })}
    </ul>
  );
};
