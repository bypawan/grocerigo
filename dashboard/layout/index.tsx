import React from "react";

import { Sidebar } from "./sidebar/sidebar";
import { Header } from "./Header";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid grid-cols-[16rem,1fr] grid-rows-[6rem,1fr] gap-5 antialiased text-gray-800">
      <Sidebar />
      <Header />
      <div className="col-start-2 pr-5">{children}</div>
    </div>
  );
};
