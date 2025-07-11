import { FC } from 'react'

import BaseBalance, { BalanceProps } from './base'

const InternalBalance: FC<BalanceProps> = ({ icon, value, isLoading }) => {
    return (
        <BaseBalance
            value={value}
            isLoading={isLoading}
            icon={icon}
            classes={{ wrapper: 'border border-base-600 rounded-2xl px-3 sm:w-auto' }}
        />
    )
}

export default InternalBalance
