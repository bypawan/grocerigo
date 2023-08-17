import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/provider/nextauth";

import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grocerigo",
  description: "Grocerigo your grocery store.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} container p-0`}>
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
