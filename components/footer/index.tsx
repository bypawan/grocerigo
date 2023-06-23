import React from "react";
import * as footerImages from "@/assets/images/testimonials";
import Link from "next/link";
import footerLogo from "@/assets/images/footer/footer-logo.png";
import { CtaArrow } from "../icons";
import Image from "next/image";

export const Footer = () => {
  return (
    <section
      className="min-h-screen relative py-[140px]"
      style={{ background: `url(${footerImages.pattern.src})` }}
    >
      <div className="container mx-auto pb-36 text-center">
        <h2 className="text-[120px] leading-[130px] text-white">
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
      <div className="container mx-auto border-t border-t-[#2a4363] pt-16 flex items-center justify-center flex-col">
        <Image src={footerLogo} alt="Footer logo" />
        <div className="flex item-center mt-14 gap-5 text-sm">
          <Link
            className="hover:text-white transition-[color] duration-300"
            href="/"
          >
            Terms & Conditions
          </Link>
          <Link
            className="hover:text-white transition-[color] duration-300"
            href="/"
          >
            Privacy Policy
          </Link>
          <Link
            className="hover:text-white transition-[color] duration-300"
            href="/"
          >
            ©Triple Shot Cafe 2023
          </Link>
        </div>
      </div>
    </section>
  );
};
