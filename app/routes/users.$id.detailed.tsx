import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { BreadcrumbsItem } from "~/components/breadcrumbs/breadcrumbs-item";

export const handle = {
	breadcrumb: ({ params }: { params: { id: string } }) => (
		<BreadcrumbsItem>Detailed</BreadcrumbsItem>
	),
};

export async function loader({ params }: { params: { id: string } }) {
	console.log("Fetching user with ID:", params.id);
	const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users/${params.id}`);
	const user = await res.json();

	if (!res.ok || !user?.id) {
		console.error("API error:", res.status, res.statusText);
		throw new Response("User not found", { status: 404 });
	}

	console.log("User data:", user);
	return json(user);
}

export default function UserDetails() {
	const user = useLoaderData<typeof loader>();

	return (
		<div className="p-6 bg-white rounded-lg shadow-md max-w-md">
			<h3 className="text-xl font-semibold text-gray-800 mb-4">User #{user.id}</h3>
			<div className="space-y-3">
				<div className="flex items-center">
					<span className="font-medium text-gray-600 w-24">Name:</span>
					<span className="text-gray-800">{user.name}</span>
				</div>
				<div className="flex items-center">
					<span className="font-medium text-gray-600 w-24">Email:</span>
					<span className="text-gray-800">{user.email}</span>
				</div>
			</div>
		</div>
	);
}