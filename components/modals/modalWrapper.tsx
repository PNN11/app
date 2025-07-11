import { FC, ReactNode } from 'react'

import CloseSvg from 'components/svg/closeSvg'

type PropsType = {
    close: () => void
    title: string
    children: ReactNode
    className?: string
}
const ModalWrapper: FC<PropsType> = ({ children, title, close, className }) => {
    return (
        <div className="flex w-screen max-w-[35.5rem] flex-col gap-8 rounded-2xl bg-base-700 p-5 md:rounded-2xl md:p-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl">{title}</h2>
                <div className="flex cursor-pointer transition-colors" onClick={close}>
                    <CloseSvg />
                </div>
            </div>
            <div className={className}>{children}</div>
        </div>
    )
}

export default ModalWrapper
