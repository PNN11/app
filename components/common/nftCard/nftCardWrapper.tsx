import { FC, HTMLAttributes, ReactNode } from 'react'

import Link, { LinkProps } from 'next/link'

import TranslateCardWrapper from '../wrappers/translateCard'

interface NftCardWrapperProps extends HTMLAttributes<HTMLAnchorElement>, LinkProps {
    children: ReactNode
}

const NftCardWrapper: FC<NftCardWrapperProps> = ({ children, ...props }) => {
    return (
        <Link {...props} className="group/translate-card group block cursor-pointer">
            <TranslateCardWrapper>
                <div className="flex h-full flex-col overflow-hidden">{children}</div>
            </TranslateCardWrapper>
        </Link>
    )
}

export default NftCardWrapper
