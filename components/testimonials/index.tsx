import React from "react";
import * as testimonialImages from "@/assets/images/testimonials";
import Image from "next/image";

export const Testimonials = () => {
  return (
    <section
      className="min-h-screen text-white relative"
      style={{ background: `url(${testimonialImages.pattern.src})` }}
    >
      <div className="bg-white w-[80px] h-1 absolute top-1/2 left-0" />
      <div className="bg-white w-[80px] h-1 absolute top-1/2 right-0" />
      <div className="flex flex-col justify-center items-center py-[140px]">
        <p className="text-[#1880ff] text-sm font-bold tracking-[2px] mb-8">
          WHAT CUSTOMERS SAY
        </p>
        <h3 className="mb-[100px] text-[56px] leading-[66px]">
          Why we’re different
        </h3>
        <p className=" mb-8 text-4xl leading-[46px] max-w-4xl text-center">
          <em>
            &quot;This coffee place has a cozy atmosphere and great coffee. The
            baristas are friendly and knowledgeable about their craft. Highly
            recommend their cappuccinos.&quot;
          </em>
        </p>
        <p className="mb-10 capitalize text-xl text-[#767f8b] tracking-widest">
          Catherine Lipschwitz
        </p>
        <Image className="mb-14" src={testimonialImages.author} alt="author" />
      </div>
    </section>
  );
};
