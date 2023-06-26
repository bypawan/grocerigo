"use client";

import Image from "next/image";
import { useState } from "react";
import * as navImages from "@/assets/images/header";
import { CartSidebar } from "./cart";

export default function Cart() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 hover:text-[#006cf0] transition-[color] duration-300"
      >
        <Image src={navImages.cart} alt="cart" />
        My Cart
      </button>
      <CartSidebar open={open} setOpen={setOpen} />
    </>
  );
}
