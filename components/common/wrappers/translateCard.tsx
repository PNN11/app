import { FC, ReactNode } from 'react'

import TranslateWrapper from './translateWrapper'

interface TranslateCardWrapperProps {
    children: ReactNode
}

const TranslateCardWrapper: FC<TranslateCardWrapperProps> = ({ children }) => {
    return (
        <TranslateWrapper className="group-hover/translate-card:-translate-y-3">
            {children}
        </TranslateWrapper>
    )
}

export default TranslateCardWrapper
