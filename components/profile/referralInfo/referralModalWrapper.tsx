import { FC } from 'react'

import CloseSvg from 'components/svg/closeSvg'

type Elements = 'container' | 'wrapper' | 'title'
interface IReferralModalWrapper {
    title: string | JSX.Element
    children: JSX.Element
    classes?: Partial<Record<Elements, string>>
    className?: string
    onClose: () => void
}

const ReferralModalWrapper: FC<IReferralModalWrapper> = ({
    title,
    children,
    classes,
    className,
    onClose,
}) => {
    return (
        <div
            className={`flex w-screen max-w-[35.5rem] flex-col gap-8 rounded-2xl border border-base-700 bg-bg p-5 md:rounded-2xl md:p-8 ${
                classes?.wrapper ?? ''
            }`}
        >
            <div className="flex items-center justify-between">
                <h2 className={`text-xl ${classes?.title ?? ''}`}>{title}</h2>
                <div className="flex cursor-pointer transition-colors" onClick={onClose}>
                    <CloseSvg />
                </div>
            </div>
            <div className={className}>{children}</div>
        </div>
    )
}

export default ReferralModalWrapper
