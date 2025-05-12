import {BreadcrumbsItem} from "../components/breadcrumbs/breadcrumbs-item";


export const handle = {
  breadcrumb: () => <BreadcrumbsItem to="/">Dashboard</BreadcrumbsItem>,
}


export default function Index() {
  return <h1>Dashboard</h1>;
}
