import { json, ActionFunctionArgs, redirect } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import {BreadcrumbsItem} from "~/components/breadcrumbs/breadcrumbs-item";
import UserForm from "~/features/users/form";

export const handle = {
	breadcrumb: () => <BreadcrumbsItem>Add</BreadcrumbsItem>,
};

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;

	if (!name || name.length < 2) {
		return json({ error: "Name must be at least 2 characters long" }, { status: 400 });
	}
	if (!email || !email.includes("@")) {
		return json({ error: "Invalid email address" }, { status: 400 });
	}

	const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email }),
	});

	if (!res.ok) {
		console.error("API error:", res.status, res.statusText);
		return json({ error: "Failed to create user" }, { status: 500 });
	}

	const newUser = await res.json();
	console.log("New user created:", newUser);

	return redirect(`/users`);
}

export default function UserAdd() {
	const actionData = useActionData<typeof action>();
	const navigation = useNavigation();

	const isSubmitting = navigation.state === "submitting";

	return (
		<UserForm
			error={actionData?.error}
			isSubmitting={isSubmitting}
		/>
	);
}
