import Link from "next/link";
import React from "react";

export const NewsLetter = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-xl flex flex-col items-center justify-center text-center">
        <p className="text-[#1880ff] tracking-[2px] mb-7 text-sm font-bold">
          NEWSLETTER
        </p>
        <h3 className="text-[#030c24] text-[56px] leading-[66px] mb-8">
          Subscribe to stay in touch
        </h3>
        <p className="text-xl leading-[30px] mb-8">
          You can subscribe at anytime by clicking the unsubscribe button at the
          end of any newsletter.
        </p>
        <div className="mb-16 border rounded-[40px] border-[#767f8b]">
          <input
            type="email"
            className="text-xl py-5 px-7 text-[#333] bg-transparent focus:outline-none"
            placeholder="Your email here"
          />
          <button className="bg-[#1880ff] hover:bg-[#006cf0] text-white py-6 px-16 text-lg rounded-[40px] transition-[background] duration-300">Submit</button>
        </div>
        <p className="text-[#1880ff] tracking-[2px] mb-1 text-base font-bold">
          CONTACT@TRIPLESHOTCAFE.COM
        </p>
        <Link
          href="/"
          className="hover:text-[#1880ff] text-[#030c24] uppercase tracking-[2px] text-base font-bold transition-[color] duration-300"
        >
          Instagram
        </Link>
        <Link
          href="/"
          className="hover:text-[#1880ff] text-[#030c24] uppercase tracking-[2px] mb-2 text-base font-bold transition-[color] duration-300"
        >
          Twitter
        </Link>
      </div>
    </section>
  );
};
