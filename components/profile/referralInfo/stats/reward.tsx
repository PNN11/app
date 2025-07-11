import { FC } from 'react'

import Image from 'next/image'

type Props = {
    referralCount: number
    amount: number
    available: boolean
}

export const amountFormatter = (amount: number): string => {
    return new Intl.NumberFormat('en', { notation: 'compact' }).format(amount)
}

const Reward: FC<Props> = ({ referralCount, amount, available }) => {
    return (
        <div
            className={`relative z-[1] h-12 w-12 space-y-1 rounded-lg border-2 p-1 ${
                available ? 'border-cta bg-base-800' : 'border-base-700 bg-bg'
            }`}
        >
            <div className="text-center text-custom-lg font-medium">{referralCount}</div>
            <div className="flex items-center justify-center gap-1">
                <p className="text-xs leading-3">{amountFormatter(amount)}</p>
                <Image src="/images/amt-icon.svg" width={12} height={12} alt="" />
            </div>
        </div>
    )
}

export default Reward
