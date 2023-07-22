import React from "react";
import { Logo } from "../icons";
import Link from "next/link";
import Cart from "../new/cart";
import { Authentication } from "./auth";

export const Header = () => {
  return (
    <nav className="container mx-auto py-10 px-14 flex justify-between items-center">
      <Link
        href="/"
        className="w-[50vw] sm:w-[24vw] md:w-[30] lg:w-[12vw] inline-block"
      >
        <Logo />
      </Link>
      <ul className="flex items-center gap-10">
        <li className="hover:text-[#006cf0] transition-[color] duration-300">
          <Link href="/">Our products</Link>
        </li>
        <li className="hover:text-[#006cf0] transition-[color] duration-300">
          <Link href="/">Process</Link>
        </li>
        <li className="hover:text-[#006cf0] transition-[color] duration-300">
          <Link href="/">What people say</Link>
        </li>
        <li className="hover:text-[#006cf0] transition-[color] duration-300">
          <Link href="/">Our story</Link>
        </li>
      </ul>
      <div className="flex items-center gap-5 text-[#030c24]">
        <Cart />
        <Authentication />
        <Link
          href="/"
          className="hover:text-[#006cf0] transition-[color] duration-300"
        >
          Contact us today
        </Link>
      </div>
    </nav>
  );
};
