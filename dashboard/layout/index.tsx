import React from "react";

import { Header } from "./Header";
import { Sidebar } from "./sidebar/sidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen grid grid-cols-[16rem,1fr] grid-rows-[6rem,1fr] antialiased text-gray-800">
      <Sidebar />
      <Header />
      <div className="col-start-2 p-5">{children}</div>
    </div>
  );
};
