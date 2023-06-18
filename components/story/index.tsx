import React from "react";
import * as storyImage from "@/assets/images/story";
import Image from "next/image";

export const Story = () => {
  return (
    <section className="relative">
      <Image
        className="absolute top-28 left-8"
        src={storyImage.cornerLeft}
        alt="corner"
      />
      <Image
        className="absolute bottom-20 right-8"
        src={storyImage.cornerRight}
        alt="corner"
      />
      <div className="max-w-6xl mx-auto py-[140px] grid grid-cols-2 justify-items-center items-center gap-10">
        <div className="">
          <p className="text-[#1880ff] tracking-[2px] mb-7 text-sm font-bold">
            OUR STORY
          </p>
          <h3 className="text-[#030c24] text-[56px] leading-[66px] mb-8">
            At the heart of everything
          </h3>
          <p className="text-xl leading-[30px] mb-8">
            At Triple Shot Café, we believe that every cup of coffee is an
            opportunity to create something special. That&apos;s why we&apos;re
            dedicated to sourcing the highest quality beans from around the
            world, and to crafting each cup with care and attention to detail.
          </p>
          <p className="text-xl leading-[30px]">
            Our commitment to quality extends beyond just our coffee. We also
            take pride in creating a warm and welcoming atmosphere in our cafes,
            where our customers can relax, catch up with friends, or get some
            work done. Whether you&apos;re a coffee aficionado or just looking
            for a cozy spot to grab a drink, we have something for everyone.
          </p>
        </div>
        <div className="">
          <Image src={storyImage.story} alt="story" />
        </div>
      </div>
    </section>
  );
};
