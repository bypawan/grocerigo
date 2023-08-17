import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grocerigo",
  description: "Grocerigo your grocery store.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
