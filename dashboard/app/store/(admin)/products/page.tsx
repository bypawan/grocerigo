import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getProducts() {
  const session = await getServerSession(authOptions);
  const token = session.user.DATA.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return <main className="">{JSON.stringify(products)}</main>;
}
