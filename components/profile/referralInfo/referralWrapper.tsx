import { FC, PropsWithChildren } from 'react'

import ExternalInlineLink from '../basicInfo/externalInlineLink'

import { prod } from 'utils/environment'

interface IReferralWrapper {
    title: string
    className?: string
}

const prodPostId = '64fddace82926c8260f4b0b4'
const devPostId = '64491c51018387d0baae1b43'

const ReferralWrapper: FC<PropsWithChildren<IReferralWrapper>> = ({
    title,
    children,
    className,
}) => {
    const postId = prod.value(prodPostId, devPostId)

    return (
        <div className={className}>
            <div className="mb-3 mt-5 flex flex-wrap justify-between md:mt-6">
                <p className="text-custom-2.5xl font-medium">{title}</p>
                <ExternalInlineLink href={`/blog/post/${postId}`}>
                    About referral program
                </ExternalInlineLink>
            </div>
            {children}
        </div>
    )
}

export default ReferralWrapper
