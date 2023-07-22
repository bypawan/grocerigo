"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Authentication = () => {
  const { data: session } = useSession();

  return session?.user ? (
    <button
      onClick={() => signOut()}
      className="hover:text-[#006cf0] transition-[color] duration-300"
    >
      Logout
    </button>
  ) : (
    <Link
      href="/login"
      className="hover:text-[#006cf0] transition-[color] duration-300"
    >
      Login
    </Link>
  );
};
