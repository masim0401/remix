import { Form, useLoaderData, redirect } from "@remix-run/react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
	const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users/${params.userId}`);
	if (!res.ok) throw new Response("User not found", { status: 404 });
	return await res.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData();
	const updatedUser = {
		name: formData.get("name"),
		email: formData.get("email"),
	};

	const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users/${params.userId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(updatedUser),
	});

	if (!res.ok) throw new Response("Failed to update user", { status: 500 });

	return redirect(`/users/${params.userId}`);
}

export default function EditUser() {
	const user = useLoaderData<typeof loader>();

	return (
		<div>
			<h3>Edit User #{user.id}</h3>
			<Form method="post">
				<p>
					<label>
						Name:
						<input type="text" name="name" defaultValue={user.name} required />
					</label>
				</p>
				<p>
					<label>
						Email:
						<input
							type="email"
							name="email"
							defaultValue={user.email}
							required
						/>
					</label>
				</p>
				<button type="submit">Save</button>
			</Form>
		</div>
	);
}
