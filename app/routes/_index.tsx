import {Link, useLoaderData} from "@remix-run/react";
import {data} from "@remix-run/router";
import {useAppContext} from "@context/app-context";

export async function loader() {
  const res = await fetch("https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users");
  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
    throw new Response("Failed to fetch users", { status: 500 });
  }
  const users = await res.json();
  console.log("Fetched users:", users);
  return data({ userCount: users.length });
}

export default function Dashboard() {
  const { userCount } = useLoaderData<typeof loader>();
  const {lastEditUser} = useAppContext()

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="text-lg">
          <span className="font-medium text-gray-600">Total Users: </span>
          <span className="text-gray-800">{userCount}</span>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="text-lg">
          <span className="font-medium text-gray-600">Last edit user: </span>
          {
            lastEditUser.id &&
            <Link to={`/users/${lastEditUser.id}/edit`}>
              <span className="text-gray-800">{lastEditUser.name} {lastEditUser.email}</span>
            </Link>
          }
        </div>
      </div>
    </div>

  );
}