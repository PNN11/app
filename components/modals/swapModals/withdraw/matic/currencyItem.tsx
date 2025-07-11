import { FC } from 'react'

import Image from 'next/image'

type Props = {
    icon: string
    amount: number
}

const CurrencyItem: FC<Props> = ({ amount, icon }) => {
    return (
        <div className="flex min-w-[10rem] flex-col items-center gap-2">
            <Image src={icon} width={64} height={64} alt="" />
            <div className="text-xl">{amount}</div>
        </div>
    )
}

export default CurrencyItem
