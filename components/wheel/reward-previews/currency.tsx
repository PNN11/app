import { FC } from 'react'

import Image from 'next/image'

import { WheelCore } from 'common-types/wheel'
import { getCurrencySymbol } from 'components/common/nftCard/currency/symbol'

type Props = {
    reward: WheelCore.CryptoSpinResult | WheelCore.VirtualCurrencYSpinResult
}

const CurrencyWheelRewardPreview: FC<Props> = ({ reward }) => {
    return (
        <>
            <div className="relative">
                <div className="mb-3 w-full text-center text-custom-2.5xl font-medium">{`Reward: ${
                    reward.amount
                } ${getCurrencySymbol(reward.currency)}`}</div>
                <div className="grid place-items-center">
                    <Image
                        src={reward.meta.preview}
                        width={591}
                        height={487}
                        alt=""
                        className="max-h-100 w-auto"
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
                {/* <SocialShareBlock
                    nft={mockNftReward as unknown as IMarketplaceToken.TBodyResponse}
                /> */}
            </div>
        </>
    )
}

export default CurrencyWheelRewardPreview
