import { FC, PropsWithChildren } from 'react'

import StepCardWrapper from './wrapper'

type Props = {
    title: string | JSX.Element
    step: number
    className?: string
}

const StepCard: FC<PropsWithChildren<Props>> = ({ step, title, children, className }) => {
    return (
        <StepCardWrapper className={className}>
            <p className="mb-1 text-cta">Step {step}</p>
            <h5 className="mb-2 font-medium text-base-100">{title}</h5>
            <p className="text-base-200">{children}</p>
        </StepCardWrapper>
    )
}

export default StepCard
