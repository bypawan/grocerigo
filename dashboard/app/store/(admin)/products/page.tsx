import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DataTable } from "@/module/products/table/data-table";
import { ProductColumns } from "@/module/products/table/columns";

async function getProducts(page: number) {
  const session = await getServerSession(authOptions);
  const token = session.user.DATA.token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products?page=${page}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function ProductsPage({
  searchParams = {},
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams.page ? searchParams.page : 1;
  const products = await getProducts(+page);

  return (
    <main className="">
      <DataTable
        columns={ProductColumns}
        data={products.DATA.products}
        currentPage={products.DATA.page}
        totalPages={products.DATA.totalPages}
      />
    </main>
  );
}
