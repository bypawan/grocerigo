import { getServerSession } from "next-auth";

import Error from "./error";
import { UserDataTable } from "@/module/users/table/data-table";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserColumns } from "@/module/users/table/columns";

async function getUsers(page: number) {
  const session = await getServerSession(authOptions);
  const token = session.user.DATA.token;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users?page=${page}`,
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

export default async function UsersPage({
  searchParams = {},
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams.page ? searchParams.page : 1;
  const users = await getUsers(+page);

  console.log(users);

  return (
    <main>
      {!users.error && users.message !== "fetch failed" ? (
        <UserDataTable
          columns={UserColumns}
          data={users.DATA}
          // currentPage={users.DATA.page}
          // totalPages={users.DATA.totalPages}
        />
      ) : (
        <Error
          error={
            users.message === "fetch failed"
              ? { error: true, message: "Server is offline." }
              : users
          }
        />
      )}
    </main>
  );
}
