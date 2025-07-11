import { FC, ReactNode } from 'react'

import AccordionWrapper from 'components/common/ui/accordionWrapper'

interface NftAccordionWrapperProps {
    title: string
    children: ReactNode
}

const NftAccordionWrapper: FC<NftAccordionWrapperProps> = ({ children, title }) => {
    return (
        <AccordionWrapper
            title={title}
            classes={{ title: 'text-xl', wrapper: 'mb-4 bg-base-700 py-4 px-5 rounded-2xl' }}
        >
            <div className="mt-4 mb-1 border-t border-base-100/10 pt-4 pb-2">{children}</div>
        </AccordionWrapper>
    )
}

export default NftAccordionWrapper
