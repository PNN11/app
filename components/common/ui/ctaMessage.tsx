import { FC } from 'react'

import SmallButton from './buttons/newSmallButton'
import { ConditionalLink } from './conditionalLink'

interface Props {
    onButtonClick?: () => void
    title: string
    description: string
    actionButton: string
    link?: string
}

const CallToAction: FC<Props> = ({ onButtonClick, description, title, link, actionButton }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="space-y-1 text-center">
                <h5 className="text-xl">{title}</h5>
                <div className="text-base text-base-200">{description}</div>
            </div>
            <ConditionalLink condition={!!link} href={link}>
                <SmallButton onClick={onButtonClick} className="tracking-wide">
                    {actionButton}
                </SmallButton>
            </ConditionalLink>
        </div>
    )
}

export default CallToAction
