import React from "react";

import { User } from "./user";

export const Header = () => {
  return (
    <div className="col-start-2 flex justify-end items-center px-5 py-1">
      <h3 className="text-lg font-semibold">Hi Admin</h3>
      <User />
    </div>
  );
};
