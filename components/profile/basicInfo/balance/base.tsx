import { FC } from 'react'

import Image from 'next/image'

import Skeleton from 'components/common/skeleton'
import { numberFormatter } from 'utils/math/formatNumber'

export type TBaseBalanceProps = {
    value: number
    icon: string
    isLoading: boolean
    classes?: { wrapper?: string }
    isError?: boolean
}

export type BalanceProps = Omit<TBaseBalanceProps, 'classes'>

const BaseBalance: FC<TBaseBalanceProps> = ({
    value,
    icon,
    isLoading,
    classes,
    isError = false,
}) => {
    return (
        <div className={`flex items-center justify-center gap-x-1 py-2 ${classes?.wrapper ?? ''}`}>
            <Skeleton isLoading={isLoading} classes={{ skeleton: 'h-8 rounded-2xl w-14' }}>
                <p className="text-xl font-medium">
                    {isError ? 'error' : numberFormatter(value, 0, 4)}
                </p>
                <Image
                    src={icon}
                    alt="coin"
                    width={32}
                    height={32}
                    className="h-8 w-8 select-none"
                />
            </Skeleton>
        </div>
    )
}

export default BaseBalance
