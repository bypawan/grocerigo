import Link from "next/link";
import React from "react";
import { CtaArrow } from "../icons";
import Image from "next/image";
import * as heroImages from "@/assets/images/header";

export const Hero = () => {
  return (
    <header className="min-h-[calc(100vh-104px)] relative overflow-hidden">
      <div className="max-w-[1140px] mx-auto flex flex-col items-center justify-center">
        <h1 className="text-[#030c24] text-[100px] leading-[110px] text-center pt-24">
          Experience the Perfect Trio of Coffee
        </h1>
        <p className="text-xl max-w-2xl text-center mt-3">
          Discover our hand-picked collection of three exquisite coffees,
          roasted to perfection for a rich, flavorful taste.
        </p>
        <Link
          href="/"
          className="hover:bg-[#006cf0] bg-[#1880ff] transition-[background] duration-300 text-white mt-10 py-5 pr-20 pl-10 rounded-full relative group inline-block"
        >
          See our products
          <span className="flex justify-center items-center absolute top-0 bottom-0 right-0 bg-[#006cf0] w-[64px] h-[64px] rounded-full group-hover:-rotate-45 transition-[transform] duration-300">
            <CtaArrow />
          </span>
        </Link>
        <div className="relative max-w-4xl w-full flex justify-center">
          <Image
            className="mt-10"
            src={heroImages.coffeeBag}
            alt="Triple shot coffee brand image"
          />
          <Image
            className="absolute bottom-16 -left-28 -z-10 w-[50vw] sm:w-[20vw]"
            src={heroImages.coffeeBeansLeft}
            alt="coffee beans"
          />
          <Image
            className="absolute -top-24 -right-5 -z-10 w-[50vw] sm:w-[20vw]"
            src={heroImages.coffeeBeansRight}
            alt="coffee beans"
          />
        </div>
      </div>
      <Image
        className="absolute w-[40vw] sm:w-[20vw] -right-36 bottom-40"
        src={heroImages.cup}
        alt="coffee cup"
      />
      <Image
        className="absolute w-[40vw] sm:w-[20vw] bottom-[20rem] -left-20"
        src={heroImages.donut}
        alt="donut"
      />
      <Image
        className="absolute w-[30vw] sm:w-[15vw] top-48 left-0 -z-10"
        src={heroImages.leafLeft}
        alt="donut"
      />
        <Image
        className="absolute w-[38vw] sm:w-[19vw] top-0 right-0 -z-10"
        src={heroImages.leafRight}
        alt="donut"
      />
    </header>
  );
};
