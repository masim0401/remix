import {Links, Meta, Outlet, Scripts} from "@remix-run/react";
import type {LinksFunction} from "@remix-run/node";

import "./tailwind.css";
import {Sidebar} from "./components/sidebar/sidebar";
import {Breadcrumbs} from "./components/breadcrumbs/breadcrumbs";
import {BreadcrumbsItem} from "./components/breadcrumbs/breadcrumbs-item";

export const handle = {
	breadcrumb: () => <BreadcrumbsItem>Dashboard</BreadcrumbsItem>,
};


export const links: LinksFunction = () => [
	{rel: "preconnect", href: "https://fonts.googleapis.com"},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export default function App() {
	return (
		<html lang="en">
		<head>
			<Meta/>
			<Links/>
		</head>
		<body>
		<div className='h-screen p-2'>
			<div className="flex gap-2 h-full">
				<div className='max-h-full bg-blue-300 rounded-2xl overflow-y-auto w-40 p-1 pt-3'>
					<Sidebar/>
				</div>
				<div className='bg-blue-400 h-full rounded-2xl w-full p-4 overflow-y-auto'>
					<Breadcrumbs/>
					<Outlet/>
				</div>
			</div>
		</div>
		<Scripts/>
		</body>
		</html>
	);
}
