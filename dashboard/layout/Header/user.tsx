"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileIcon, SettingIcon } from "@/components/ui/icons";

export const User = () => {
  const pathname = usePathname();

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://github.com/pawanjs.png" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="absolute -right-4 top-1 w-48">
        <div className="flex flex-col gap-1">
          <Link
            className={`flex flex-row items-center h-12 hover:bg-gray-50 hover:text-[#009d63] transition-all duration-300 rounded-lg ${
              pathname === "/store/dashboard"
                ? "text-[#009d63] bg-gray-100 font-bold"
                : "text-gray-600"
            }`}
            href="/store/dashboard"
          >
            <span className="inline-flex justify-c9enter items-center ml-4">
              <ProfileIcon />
            </span>
            <span className="ml-2 text-md tracking-wide truncate">Profile</span>
          </Link>
          <Link
            className={`flex flex-row items-center h-11 hover:bg-gray-50 hover:text-[#009d63] transition-all duration-300 rounded-xl ${
              pathname === "/store/orders"
                ? "text-[#009d63] bg-gray-100 font-bold"
                : "text-gray-600"
            }`}
            href="/store/orders"
          >
            <span className="inline-flex justify-c9enter items-center ml-4">
              <SettingIcon />
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">Setting</span>
          </Link>
          <Button variant="outline" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
