"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">Setting</span>
          </Link>
          <Button variant="outline">Logout</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
