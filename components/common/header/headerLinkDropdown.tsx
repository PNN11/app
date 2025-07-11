import { FC, useMemo } from 'react'

import { useRouter } from 'next/router'

import HeaderLink from './headerLink'

import Chevron from 'components/svg/chevron'

interface Props {
    title: string
    onMenuItemClick?: () => void
    menuItems: { title: string; href: string }[]
}

const HeaderLinkDropdown: FC<Props> = ({ title, menuItems, onMenuItemClick }) => {
    const { asPath } = useRouter()

    const menuItemSelected = useMemo(
        () => menuItems.some(({ href }) => asPath.includes(href)),
        [menuItems, asPath]
    )

    return (
        <li
            className={`group relative block whitespace-nowrap border-b text-xl font-normal  duration-[400ms] hover:text-base-100 lg:px-3 lg:py-4 lg:text-custom-sl
            lg:font-medium ${
                menuItemSelected
                    ? 'border-base-100 text-base-100 transition-none hover:border-transparent'
                    : 'border-transparent text-base-300 transition-colors'
            }`}
        >
            <div className="flex items-center gap-1">
                <span>{title}</span>
                <Chevron className="rotate-180 transition-transform duration-300 group-hover:rotate-0" />
            </div>
            <ul className="top-full left-0 mt-5 hidden w-fit space-y-5 rounded-lg bg-bg pb-2 group-hover:block lg:absolute lg:mt-0 lg:space-y-0">
                {menuItems.map(({ href, title }) => (
                    <HeaderLink
                        classes={{ wrapper: 'whitespace-nowrap', link: '!border-transparent' }}
                        key={title}
                        title={title}
                        onClick={onMenuItemClick}
                        href={href}
                    />
                ))}
            </ul>
        </li>
    )
}

export default HeaderLinkDropdown
