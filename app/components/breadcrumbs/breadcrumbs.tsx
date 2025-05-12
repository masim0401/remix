import { UIMatch, useMatches, Link } from "@remix-run/react"
import { Fragment, HTMLAttributes } from "react"

type BreadcrumbMatch = UIMatch<
	Record<string, unknown>,
	{ breadcrumb: (data?: unknown) => JSX.Element }
>

export const Breadcrumbs = ({ ...props }: HTMLAttributes<HTMLElement>) => {
	const matches = (useMatches() as unknown as BreadcrumbMatch[]).filter(
		({ handle }) => handle?.breadcrumb
	)

	return (
		<ol
			itemScope
			itemType="https://schema.org/BreadcrumbList"
			className="flex flex-wrap items-center gap-2.5 pt-0 pb-1 mb-5 border-b-2 border-b-blue-900 "
			{...props}
		>
			{matches.map(({ handle, data, pathname }, i) => {
				const isLast = i === matches.length - 1

				const content = handle.breadcrumb(data)

				return (
					<Fragment key={i}>
						<li
							className="contents"
							itemProp="itemListElement"
							itemScope
							itemType="https://schema.org/ListItem"
						>
							{i > 0 && <span className="text-sm">/</span>}

							{isLast ? (
								<span itemProp="name" className="text-gray-800">
                  {content}
                </span>
							) : (
								<Link to={pathname} itemProp="item">
									{content}
								</Link>
							)}

							<meta itemProp="position" content={`${i + 1}`} />
						</li>
					</Fragment>
				)
			})}
		</ol>
	)
}
