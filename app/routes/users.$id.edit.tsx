import {ActionFunctionArgs} from "@remix-run/node";
import {useLoaderData, useActionData, useNavigation} from "@remix-run/react";
import {BreadcrumbsItem} from "~/components/breadcrumbs/breadcrumbs-item";
import UserForm from "~/features/users/form";
import {data} from "@remix-run/router";
import {useAppContext} from "~/context/app-context";

interface ActionData {
	error?: string;
	success?: string;
}

interface User {
	id: string;
	name: string;
	email: string;
}

export const handle = {
	breadcrumb: () => (
		<BreadcrumbsItem>Edit</BreadcrumbsItem>
	),
};

export async function loader({params}: { params: { id: string } }) {
	console.log("Fetching user with ID:", params.id);
	const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users/${params.id}`);
	const user = await res.json();

	if (!res.ok || !user?.id) {
		console.error("API error:", res.status, res.statusText);
		return new Response("User not found", {status: 404});
	}

	console.log("User data:", user);
	return data(user);
}

export async function action({request, params}: ActionFunctionArgs) {
	const formData = await request.formData();
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;

	if (!name || name.length < 2) {
		return data({error: "Name must be at least 2 characters long"}, {status: 400});
	}
	if (!email || !email.includes("@")) {
		return data({error: "Invalid email address"}, {status: 400});
	}

	const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users/${params.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({name, email}),
	});

	if (!res.ok) {
		console.error("API error:", res.status, res.statusText);
		return data({error: "Failed to update user"}, {status: 500});
	}

	console.log("User updated:", params.id);
	return data({success: "Success submit"}, {status: 200});
}

export default function UserEdit() {
	const user = useLoaderData<User>();
	const actionData = useActionData<ActionData>();
	const navigation = useNavigation();


	const isSubmitting = navigation.state === "submitting";

	return (
		<UserForm
			defaultName={user.name}
			defaultEmail={user.email}
			error={actionData?.error}
			success={actionData?.success}
			isSubmitting={isSubmitting}
		/>
	);
}
