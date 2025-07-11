import { FC } from 'react'

import BaseBalance from './base'

import { Economics } from 'common-types/economics'
import useWalletBalanceNative from 'hooks/balance/useWalletBalanceNative'
import { TChainIds } from 'services/wallets/blockchainProvider'

interface WalletBalanceNativeProps {
    currency: Economics.IAsset
}

const WalletBalanceNative: FC<WalletBalanceNativeProps> = ({ currency }) => {
    const { data, isLoading, isError } = useWalletBalanceNative({
        chainId: currency.chaiId as TChainIds,
    })

    return (
        <BaseBalance
            isLoading={isLoading}
            value={data}
            icon={currency.icon}
            classes={{ wrapper: 'border border-base-600 rounded-2xl px-3 sm:w-auto' }}
            isError={isError}
        />
    )
}

export default WalletBalanceNative
