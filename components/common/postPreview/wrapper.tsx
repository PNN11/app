import { FC, ReactNode } from 'react'

import Link, { LinkProps } from 'next/link'

import TranslateCardWrapper from '../wrappers/translateCard'

interface PostPreviewWrapperProps {
    className?: string
    children: ReactNode
    href: LinkProps['href']
}

const PostPreviewWrapper: FC<PostPreviewWrapperProps> = ({ children, className, href }) => {
    return (
        <Link
            href={href}
            className={`group/translate-card group block h-full cursor-pointer ${className}`}
        >
            <TranslateCardWrapper>
                <div className="flex h-full flex-col">{children}</div>
            </TranslateCardWrapper>
        </Link>
    )
}

export default PostPreviewWrapper
