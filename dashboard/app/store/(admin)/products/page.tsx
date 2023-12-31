import { getServerSession } from "next-auth";

import Error from "./error";
import { ProductDataTable } from "@/module/products/table/data-table";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProductColumns } from "@/module/products/table/columns";

async function getProducts(page: number) {
  const session = await getServerSession(authOptions);
  const token = session.user.DATA.token;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products?page=${page}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return await res.json();
  } catch (error) {
    return error;
  }
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
    <main>
      {!products.error && products.message !== "fetch failed" ? (
        <ProductDataTable
          columns={ProductColumns}
          data={products.DATA.products}
          currentPage={products.DATA.page}
          totalPages={products.DATA.totalPages}
        />
      ) : (
        <Error
          error={
            products.message === "fetch failed"
              ? { error: true, message: "Server is offline." }
              : products
          }
        />
      )}
    </main>
  );
}
