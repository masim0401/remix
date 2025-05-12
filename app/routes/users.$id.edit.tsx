import { json, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useActionData, useNavigation } from "@remix-run/react";
import {BreadcrumbsItem} from "~/components/breadcrumbs/breadcrumbs-item";
import UserForm from "~/features/users/form";

export const handle = {
	breadcrumb: () => <BreadcrumbsItem>Edit</BreadcrumbsItem>,
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

export default function UserEdit() {
	const user = useLoaderData<typeof loader>();
	const actionData = useActionData<typeof action>();
	const navigation = useNavigation();

	const isSubmitting = navigation.state === "submitting";

	return (
		<UserForm
			defaultName={user.name}
			defaultEmail={user.email}
			error={actionData && "error" in actionData ? actionData.error : undefined}
			success={actionData && "success" in actionData ? actionData.success : undefined}
			isSubmitting={isSubmitting}
		/>
	);
}
