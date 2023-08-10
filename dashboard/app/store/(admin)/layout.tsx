import type { Metadata } from "next";

import { Layout } from "@/layout";

export const metadata: Metadata = {
  title: "Grocerigo",
  description: "Grocerigo your grocery store.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
