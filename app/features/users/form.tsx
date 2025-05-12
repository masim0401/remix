// components/UserForm.tsx
import {Form, useNavigation} from "@remix-run/react";

interface UserFormProps {
	defaultName?: string;
	defaultEmail?: string;
	error?: string;
	success?: string;
	isSubmitting: boolean;
}

export default function UserForm({
																	 defaultName = "",
																	 defaultEmail = "",
																	 error,
																	 success,
																	 isSubmitting,
																 }: UserFormProps) {
	return (
		<div>
			<h3 className="text-lg font-semibold mb-4">
				{defaultName ? `Edit User` : "Create New User"}
			</h3>
			<Form method="post" className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-sm font-medium">
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						defaultValue={defaultName}
						className="mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						minLength={2}
						required
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
						defaultValue={defaultEmail}
						className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
						required
					/>
				</div>
				{error && <p className="text-red-500 text-sm">{error}</p>}
				{success && <p className="text-green-800 text-sm">{success}</p>}
				<button
					type="submit"
					disabled={isSubmitting}
					className={`w-full py-2 px-4 rounded-md text-white ${
						isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
					}`}
				>
					{isSubmitting ? "Submitting..." : "Submit"}
				</button>
			</Form>
		</div>
	);
}
