import {ReactNode} from "react"

type BreadcrumbsItemProps = {
	children: ReactNode;
}

export const BreadcrumbsItem = ({ children }: BreadcrumbsItemProps) => {
	return (
		<span itemProp="name">{children}</span>
	)
}