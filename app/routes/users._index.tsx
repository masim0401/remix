import { Link, useLoaderData } from "@remix-run/react";

export async function loader() {
	const res = await fetch("https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users");
	if (!res.ok) throw new Response("Failed to fetch users", { status: 500 });
	return await res.json();
}

export default function UsersList() {
	const users = useLoaderData<typeof loader>();

	return (
		<table className="w-full table-auto border border-gray-300">
			<thead className="bg-gray-400">
			<tr>
				<th className="border px-4 py-2 text-left">ID</th>
				<th className="border px-4 py-2 text-left">Name</th>
				<th className="border px-4 py-2 text-left">Email</th>
				<th className="border px-4 py-2 text-left">Actions</th>
			</tr>
			</thead>
			<tbody>
			{users.map((user: any) => (
				<tr key={user.id} className="hover:bg-gray-400">
					<td className="border px-4 py-2">{user.id}</td>
					<td className="border px-4 py-2">
						<Link to={`/users/${user.id}`} className="text-blue-600 hover:underline">
							{user.name}
						</Link>
					</td>
					<td className="border px-4 py-2">{user.email}</td>
					<td className="border px-4 py-2">
						<Link
							to={`/users/${user.id}/edit`}
							className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
						>
							Edit
						</Link>
					</td>
				</tr>
			))}
			</tbody>
		</table>
	);
}