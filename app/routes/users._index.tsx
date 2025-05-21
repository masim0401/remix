import { Await, Link, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

export async function loader() {
	const usersPromise = fetch("https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users")
		.then(async (res) => {
			if (!res.ok) throw new Response("Failed to fetch users", { status: 500 });
			return await res.json();
		});

	return { users: usersPromise };
}

export default function UsersList() {
	const { users } = useLoaderData<typeof loader>();

	return (
		<div>
			<div className="flex justify-between gap-5 items-center mb-4">
				<h2 className="text-xl font-semibold">Users</h2>

				<Link to="/users/add">
					<button className="py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 w-fit">
						Add user
					</button>
				</Link>
			</div>

			<Suspense fallback={<p className="text-gray-600">Loading users...</p>}>
				<Await resolve={users}>
					{(resolvedUsers: any[]) => (
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
							{resolvedUsers.map((user) => (
								<tr key={user.id} className="hover:bg-gray-400">
									<td className="border px-4 py-2">{user.id}</td>
									<td className="border px-4 py-2">{user.name}</td>
									<td className="border px-4 py-2">{user.email}</td>
									<td className="border px-4 py-2">
										<div className="flex gap-5 items-center">
											<Link
												to={`/users/${user.id}/edit`}
												className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
											>
												Edit
											</Link>

											<Link
												to={`/users/${user.id}/detailed`}
												className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
											>
												Detailed
											</Link>
										</div>
									</td>
								</tr>
							))}
							</tbody>
						</table>
					)}
				</Await>
			</Suspense>
		</div>
	);
}
