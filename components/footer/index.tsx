import React from "react";
import * as footerImages from "@/assets/images/testimonials";

export const Footer = () => {
  return (
    <section
      className="min-h-screen text-white relative"
      style={{ background: `url(${footerImages.pattern.src})` }}
    ></section>
  );
};
