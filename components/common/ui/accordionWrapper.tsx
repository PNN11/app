import { FC, ReactNode, useState } from 'react'

import Accordion from 'components/common/ui/accordion'
import Chevron from 'components/svg/chevron'

interface AccordionWrapperProps {
    children: ReactNode
    title: string
    disabled?: boolean
    classes?: { wrapper?: string; title?: string }
    defaultOpenState?: boolean
}

const AccordionWrapper: FC<AccordionWrapperProps> = ({
    children,
    title,
    disabled = false,
    classes = { title: '', wrapper: '' },
    defaultOpenState = false,
}) => {
    const [open, setOpen] = useState(defaultOpenState)

    return (
        <div className={`${classes.wrapper ?? ''}`}>
            <div
                onClick={() => !disabled && setOpen(!open)}
                className={`${classes.title ?? ''} ${
                    disabled ? '' : 'cursor-pointer'
                } flex items-center justify-between`}
            >
                <div>{title}</div>
                {!disabled && (
                    <Chevron
                        className={`transition-transform duration-300 ${open ? '' : 'rotate-180'}`}
                    />
                )}
            </div>
            <Accordion open={open}>{children}</Accordion>
        </div>
    )
}

export default AccordionWrapper
