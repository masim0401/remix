import {Links, Meta, Outlet, Scripts, LiveReload, Link} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
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
			<Meta />
			<Links />
		</head>
		<body>
		<div className="flex gap-5">
			<div className='flex flex-col gap-5'>
				<Link to="/my-remix-app/public">Главная</Link>
				<Link to="/about">О нас</Link>
				<Link to="/posts">Посты</Link>
				<Link to="/posts/1">Пост #1</Link>
				<Link to="/dashboard/settings">Настройки</Link>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
		<Scripts />
		<LiveReload />
		</body>
		</html>
	);
}
