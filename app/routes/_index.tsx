import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  const res = await fetch("https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users");
  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
    throw new Response("Failed to fetch users", { status: 500 });
  }
  const users = await res.json();
  console.log("Fetched users:", users);
  return json({ userCount: users.length });
}

export default function Dashboard() {
  const { userCount } = useLoaderData<typeof loader>();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <div className="text-lg">
        <span className="font-medium text-gray-600">Total Users: </span>
        <span className="text-gray-800">{userCount}</span>
      </div>
    </div>
  );
}