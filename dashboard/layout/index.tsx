import React from "react";
import { Sidebar } from "./sidebar/sidebar";

export const Layout = () => {
  return (
    <div className="min-h-screen grid grid-cols-[16rem,1fr] antialiased bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="col-start-2">
        <h1 className="text-xl">Dashboard</h1>
      </div>
    </div>
  );
};
