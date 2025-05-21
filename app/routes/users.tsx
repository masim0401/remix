import {Outlet} from "@remix-run/react";
import {BreadcrumbsItem} from "@components/breadcrumbs/breadcrumbs-item";

export const handle = {
	breadcrumb: () => <BreadcrumbsItem>Users</BreadcrumbsItem>,
};

export default function Users() {
	return (
			<Outlet />
	);
}