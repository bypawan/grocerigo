import Image from "next/image";
import React from "react";
import * as quoteImages from "@/assets/images/shop";
import * as shopImages from "@/assets/images/shop";
import Link from "next/link";
import { CtaArrow } from "../icons";

export const Shop = () => {
  return (
    <section className="container mx-auto mt-28">
      <p className="text-4xl leading-[46px] text-center max-w-5xl mx-auto">
        <em>
          “Coffee is a lot more than just a drink; it&apos;s something
          happening. Not as in hip, but like an event, a place to be, but not
          like a location, but like somewhere within yourself.”
        </em>
      </p>
      <p className="text-[#1880ff] text-sm font-bold text-center mt-7">
        - GERTRUDE STEIN
      </p>
      <div className="flex w-full justify-between items-center my-16">
        <Image
          className="w-[28%]"
          src={quoteImages.characterScrolling}
          alt="character scrolling"
        />
        <Image
          className="w-[28%]"
          src={quoteImages.characterCup}
          alt="character cup"
        />
        <Image
          className="w-[28%]"
          src={quoteImages.characterReading}
          alt="character reding"
        />
      </div>
      <div className="grid grid-cols-3 justify-between gap-10 items-center mt-[160px]">
        <div className="bg-white px-10 pb-16 rounded-3xl h-full">
          <Image
            className="-mt-16 mb-10"
            src={shopImages.guatemala}
            alt="guatemala"
          />
          <h2 className="text-4xl text-[#030c24] leading-[46px] w-2/3">
            Guatemala Swirl Sensation
          </h2>
          <p className="mt-10 mb-14 text-xl">
            Medium-bodied coffee with a nutty flavor and a hint of warmth, a
            comforting experience.
          </p>
          <h3 className="text-4xl text-[#030c24] leading-[46px]">Price $44</h3>
          <Link
            href="/"
            className="hover:bg-[#006cf0] bg-[#1880ff] transition-[background] duration-300 text-white mt-1 py-5 pr-20 pl-10 rounded-full relative group inline-block"
          >
            See our products
            <span className="flex justify-center items-center absolute top-0 bottom-0 right-0 bg-[#006cf0] w-[64px] h-[64px] rounded-full group-hover:-rotate-45 transition-[transform] duration-300">
              <CtaArrow />
            </span>
          </Link>
        </div>
        <div className="bg-white px-10 pb-16 rounded-3xl h-full">
          <Image
            className="-mt-16 mb-10"
            src={shopImages.costaRica}
            alt="costa rica"
          />
          <h2 className="text-4xl text-[#030c24] leading-[46px] w-2/3">
            Costa Rica Mocha Madness
          </h2>
          <p className="mt-10 mb-14 text-xl">
            Indulge in the smooth richness of this coffee, infused with a
            tantalizing chocolatey aroma.
          </p>
          <h3 className="text-4xl text-[#030c24] leading-[46px]">Price $44</h3>
          <Link
            href="/"
            className="hover:bg-[#006cf0] bg-[#1880ff] transition-[background] duration-300 text-white mt-1 py-5 pr-20 pl-10 rounded-full relative group inline-block"
          >
            See our products
            <span className="flex justify-center items-center absolute top-0 bottom-0 right-0 bg-[#006cf0] w-[64px] h-[64px] rounded-full group-hover:-rotate-45 transition-[transform] duration-300">
              <CtaArrow />
            </span>
          </Link>
        </div>
        <div className="bg-white px-10 pb-16 rounded-3xl h-full">
          <Image
            className="-mt-16 mb-10"
            src={shopImages.indonesia}
            alt="guatemala"
          />
          <h2 className="text-4xl text-[#030c24] leading-[46px] w-2/3">
            Indonesia Toasted Temptation
          </h2>
          <p className="mt-10 mb-14 text-xl">
            This coffee boasts a full-bodied flavor with boldness, smoky notes,
            and hints of chocolate and spice.
          </p>
          <h3 className="text-4xl text-[#030c24] leading-[46px]">Price $44</h3>
          <Link
            href="/"
            className="hover:bg-[#006cf0] bg-[#1880ff] transition-[background] duration-300 text-white mt-1 py-5 pr-20 pl-10 rounded-full relative group inline-block"
          >
            See our products
            <span className="flex justify-center items-center absolute top-0 bottom-0 right-0 bg-[#006cf0] w-[64px] h-[64px] rounded-full group-hover:-rotate-45 transition-[transform] duration-300">
              <CtaArrow />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
