import { FC } from 'react'

import WalletBalanceERC20 from './walletERC20'
import WalletBalanceNative from './walletNative'

import Skeleton from 'components/common/skeleton'
import useGetERC20Currencies from 'hooks/swap/useGetERC20Currencies'
import { blockchains } from 'services/wallets/blockchainProvider'
import { NATIVE_CURRENCY_ADDRESS } from 'utils/constants/blockchain'

interface Props {}

const WalletBalance: FC<Props> = () => {
    const { data, isLoading } = useGetERC20Currencies()

    return (
        <div className="flex flex-wrap items-center gap-1.5">
            <Skeleton
                count={Object.values(blockchains).length}
                classes={{ skeleton: 'w-20 h-10 rounded-lg', wrapper: 'flex items-center gap-1.5' }}
                isLoading={isLoading}
            >
                {!isLoading &&
                    data?.pages?.map(page =>
                        page?.docs.map(asset =>
                            asset.address === NATIVE_CURRENCY_ADDRESS ? (
                                <WalletBalanceNative key={asset._id} currency={asset} />
                            ) : (
                                <WalletBalanceERC20 key={asset._id} currency={asset} />
                            )
                        )
                    )}
            </Skeleton>
        </div>
    )
}

export default WalletBalance
