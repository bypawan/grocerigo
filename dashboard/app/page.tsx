"use client";

import { signOut } from "next-auth/react";

import { Layout } from "@/layout";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="">
      <div className="text-center">
        <h1>Home</h1>
        <Button onClick={() => signOut()}>Sign out</Button>{" "}
      </div>
      <Layout />
    </main>
  );
}
