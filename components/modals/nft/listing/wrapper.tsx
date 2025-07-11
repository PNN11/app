import { FC, ReactNode } from 'react'

import CloseSvg from 'components/svg/closeSvg'

type PropsType = {
    close: () => void
    title: string
    children: ReactNode
    className?: string
    classes?: { wrapper?: string; title?: string }
}
const ListingModalWrapper: FC<PropsType> = ({ children, title, close, className, classes }) => {
    return (
        <div
            className={`flex w-screen max-w-[35.5rem] flex-col gap-8 rounded-2xl border border-base-700 bg-bg p-5 md:rounded-2xl md:p-8 ${
                classes?.wrapper ?? ''
            }`}
        >
            <div className="flex items-center justify-between">
                <h2 className={`text-xl ${classes?.title ?? ''}`}>{title}</h2>
                <div className="flex cursor-pointer transition-colors" onClick={close}>
                    <CloseSvg />
                </div>
            </div>
            <div className={className}>{children}</div>
        </div>
    )
}

export default ListingModalWrapper
