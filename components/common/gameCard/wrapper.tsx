import { FC, ReactNode } from 'react'

import Link from 'next/link'

import TranslateCardWrapper from '../wrappers/translateCard'

interface GameCardWrapperProps {
    children: ReactNode
    id?: string
}

const GameCardWrapper: FC<GameCardWrapperProps> = ({ children, id }) => {
    return (
        <Link
            href={id ? `/games/${id}` : '/games'}
            className="group/translate-card block cursor-pointer pb-4"
        >
            <TranslateCardWrapper>{children}</TranslateCardWrapper>
        </Link>
    )
}

export default GameCardWrapper
