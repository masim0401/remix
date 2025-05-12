import { Form, useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { json, ActionFunctionArgs } from "@remix-run/node";
import { BreadcrumbsItem } from "~/components/breadcrumbs/breadcrumbs-item";

export const handle = {
	breadcrumb: ({ params }: { params?: { id?: string } }) => (
		<BreadcrumbsItem>Edit</BreadcrumbsItem>
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

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData();
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;

	if (!name || name.length < 2) {
		return json({ error: "Name must be at least 2 characters long" }, { status: 400 });
	}
	if (!email || !email.includes("@")) {
		return json({ error: "Invalid email address" }, { status: 400 });
	}

	const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users/${params.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email }),
	});

	if (!res.ok) {
		console.error("API error:", res.status, res.statusText);
		return json({ error: "Failed to update user" }, { status: 500 });
	}

	return json({ success: "User updated successfully" });
}

export default function UserDetails() {
	const user = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const navigation = useNavigation();

	const isSubmitting = navigation.state === "submitting";

	return (
		<div>
			<h3 className="text-lg font-semibold mb-4">Edit User #{user.id}</h3>
			<Form method="post" className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-sm font-medium">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						defaultValue={user.name}
						className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						minLength={2}
					/>
				</div>
				<div>
					<label htmlFor="email" className="block text-sm font-medium">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						defaultValue={user.email}
						className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
				{actionData && "error" in actionData && (
					<p className="text-red-500 text-sm">{actionData.error}</p>
				)}
				{ actionData && "success" in actionData && (
					<p className="text-green-500 text-sm">{actionData.success}</p>
				)}
				<button
					type="submit"
					disabled={isSubmitting}
					className={`w-full py-2 px-4 rounded-md text-white ${
						isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
					}`}
				>
					{isSubmitting ? "Saving..." : "Save"}
				</button>
			</Form>
		</div>
	);
}