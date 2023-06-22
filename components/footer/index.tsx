import React from "react";
import * as footerImages from "@/assets/images/testimonials";
import Link from "next/link";
import { CtaArrow } from "../icons";

export const Footer = () => {
  return (
    <section
      className="min-h-screen text-white relative"
      style={{ background: `url(${footerImages.pattern.src})` }}
    >
      <div className="container mx-auto pt-[140px] pb-20 text-center">
        <h2 className="text-[120px] leading-[130px]">
          Quality coffee sourced globally.
        </h2>
        <Link
          href="/"
          className="hover:bg-[#006cf0] bg-[#1880ff] transition-[background] duration-300 text-white mt-10 py-5 pr-20 pl-10 rounded-full relative group inline-block"
        >
          See our products
          <span className="flex justify-center items-center absolute top-0 bottom-0 right-0 bg-[#006cf0] w-[64px] h-[64px] rounded-full group-hover:-rotate-45 transition-[transform] duration-300">
            <CtaArrow />
          </span>
        </Link>
      </div>
    </section>
  );
};
