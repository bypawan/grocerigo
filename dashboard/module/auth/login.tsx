"use client";
import { Input, Image, Button } from "@nextui-org/react";

import loginBg from "@/assets/images/login/login-bg.jpg";

export const Login = () => {
  return (
    <section className="min-h-screen grid grid-cols-2">
      <div className="flex justify-center items-center">
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-semibold">Welcome back admin</h1>
          <form className="mt-10">
            <div className="">
              <Input
                type="email"
                label="Email"
                labelPlacement="outside"
                description="e.g admin@admin.com"
              />
            </div>
            <div className="mt-8">
              <Input
                type="password"
                label="Password"
                labelPlacement="outside"
                description="Your secret password"
              />
            </div>
            <div className="mt-10">
              <Button color="primary">Go to Dashboard</Button>
            </div>
          </form>
        </div>
      </div>
      <div className="">
        <Image
          removeWrapper={true}
          className="h-[90vh]"
          alt="NextUI hero Image with delay"
          src={loginBg.src}
        />
        <p className="text-center mt-2 italic">
          Image by{" "}
          <a href="https://www.freepik.com/free-vector/hand-drawn-one-line-art-illustration_22587404.htm#query=illustartion%20minimal&position=2&from_view=search&track=ais" target="_blank">
            Freepik
          </a>
        </p>
      </div>
    </section>
  );
};
