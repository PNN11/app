import { FC, ReactNode } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
    title: string
    href?: string
    onClick?: () => void
    classes?: { wrapper?: string; link?: string }
    children?: ReactNode
}

const HeaderLink: FC<Props> = ({ title, onClick, href, classes, children }) => {
    const { asPath } = useRouter()

    return (
        <li className={classes?.wrapper ?? ''}>
            <Link
                onClick={onClick}
                className={`flex items-center gap-2 whitespace-nowrap border-b text-xl font-normal transition-colors duration-[400ms] hover:text-base-100 lg:px-3 lg:py-4 lg:text-custom-sl
                  lg:font-medium ${
                      asPath.includes(href)
                          ? 'border-base-100 text-base-100'
                          : 'border-transparent text-base-300'
                  } ${classes?.link ?? ''}`}
                href={href}
            >
                <span>{title}</span> {children}
            </Link>
        </li>
    )
}

export default HeaderLink
