import { FC, ReactNode } from 'react'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface Props {
    icon: string
    children: ReactNode
    classes?: { wrapper?: string; image?: { wrapper?: string }; childrenWrapper?: string }
}

const BalancesWrapper: FC<Props> = ({ icon, children, classes }) => {
    return (
        <div
            className={twMerge(
                'grid w-full grid-flow-col items-center gap-3 rounded-2xl bg-base-800 p-2 pr-2 sm:w-auto sm:p-0 sm:pr-2',
                classes?.wrapper ?? ''
            )}
        >
            <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-base-700 p-1.25 sm:h-16 sm:w-16 sm:rounded-2xl sm:p-2.5 ${
                    classes?.image?.wrapper ?? ''
                }`}
            >
                <Image src={icon} alt="icon" width={48} height={48} />
            </div>
            <div className={classes?.childrenWrapper ?? ''}>{children}</div>
        </div>
    )
}

export default BalancesWrapper
