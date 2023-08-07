"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function HomePage() {
  return (
    <main className="">
      <h1>Home</h1>
      <Button onClick={() => signOut()}>Sign out</Button>
    </main>
  );
}
