import {Link, NavLink} from "@remix-run/react";
import cn from 'classnames';

export function Navbar() {
	const baseStyle =
		"w-full px-4 py-2 rounded-xl transition-colors duration-200";
	const activeStyle = "bg-blue-800";
	const inactiveStyle = "bg-blue-500 hover:bg-blue-600";

	return (
			<nav className="flex flex-col gap-2 w-40 p-1 pt-3 rounded-2xl border-r-blue-50 h-full bg-blue-300 overflow-y-auto">
				<span className='font-extrabold text-3xl pb-3 text-center text-blue-900'>
					Remix
				</span>
				<NavLink
					className={({isActive}) => cn(baseStyle, isActive ? activeStyle : inactiveStyle)}
					to="/">
					Dashboard
				</NavLink>
				<NavLink
					className={({isActive}) => cn(baseStyle, isActive ? activeStyle : inactiveStyle)}
					to="/users">
					Users
				</NavLink>
			</nav>
	);
}
