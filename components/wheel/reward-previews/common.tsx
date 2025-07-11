import { FC } from 'react'

import Image from 'next/image'

import { WheelRewardPreviewProps } from './types'

import { WheelCore } from 'common-types/wheel'

const rewardNamesMap: Record<WheelCore.RewardType, string> = {
    CRYPTO_CURRENCY: 'Crypto currency',
    ERC721: 'NFT',
    LOSS: 'Nothing',
    PRIVILEGE: 'Whitelist Access',
    VIRTUAL: 'NONE',
    VIRTUAL_CURRENCY: 'Virtual currency',
}

const CommonWheelRewardPreview: FC<WheelRewardPreviewProps> = ({ reward }) => {
    return (
        <>
            <div className="relative">
                <div className="mb-3 w-full text-center text-custom-2.5xl font-medium">{`Reward: ${
                    rewardNamesMap[reward.type] ?? 'Unknown'
                }`}</div>
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

export default CommonWheelRewardPreview
