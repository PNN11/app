import { FC } from 'react'

import BaseBalance from './base'

import { Economics } from 'common-types/economics'
import useWalletBalanceERC20 from 'hooks/balance/useWalletBalanceERC20'
import { TChainIds } from 'services/wallets/blockchainProvider'

interface WalletBalanceERC20Props {
    currency: Economics.IAsset
}

const WalletBalanceERC20: FC<WalletBalanceERC20Props> = ({ currency }) => {
    const { data, isLoading, isError } = useWalletBalanceERC20({
        chainId: currency.chaiId as TChainIds,
        tokenAddress: currency.address,
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

export default WalletBalanceERC20
