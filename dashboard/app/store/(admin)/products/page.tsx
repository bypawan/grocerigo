import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProductsPage() {
  try {
    const session = await getServerSession(authOptions);
    const token = session.user.DATA.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const products = await res.json();

    console.log(products);
  } catch (error) {
    console.log(error);
  }

  return <main className="">Product</main>;
}
