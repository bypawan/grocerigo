"use client";

import Image from "next/image";
import * as navImages from "@/assets/images/header";
import { CartSidebar } from "./cart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { openSideBar } from "@/redux/cartSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;

export default function Cart() {
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        onClick={() => dispatch(openSideBar())}
        className="flex items-center gap-2 hover:text-[#006cf0] transition-[color] duration-300"
      >
        <Image src={navImages.cart} alt="cart" />
        My Cart
      </button>
      <CartSidebar />
    </>
  );
}
