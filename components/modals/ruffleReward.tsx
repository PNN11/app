import { FC } from 'react'

import { IModal } from './interfaces/modalInterface'
import ListingModalWrapper from './nft/listing/wrapper'
import { ModalOverlay } from './overlay'

import { WheelCore } from 'common-types/wheel'
import CommonWheelRewardPreview from 'components/wheel/reward-previews/common'
import CurrencyWheelRewardPreview from 'components/wheel/reward-previews/currency'
import { WheelRewardPreviewProps } from 'components/wheel/reward-previews/types'

type RuffleRewardModalProps = IModal & {
    reward: WheelCore.SpinResult
}

const rewardPeviews: Record<WheelCore.RewardType, FC<WheelRewardPreviewProps>> = {
    CRYPTO_CURRENCY: CurrencyWheelRewardPreview,
    VIRTUAL_CURRENCY: CurrencyWheelRewardPreview,
    ERC721: CommonWheelRewardPreview,
    LOSS: CommonWheelRewardPreview,
    PRIVILEGE: CommonWheelRewardPreview,
    VIRTUAL: CommonWheelRewardPreview,
}

const RuffleRewardModal: FC<RuffleRewardModalProps> = ({ close, isOpen, reward }) => {
    const Component = rewardPeviews[reward?.type] ?? (() => <>Unknown reward</>)

    return (
        <ModalOverlay isOpen={isOpen} onClose={close}>
            <ListingModalWrapper
                title="Reward from the wheel"
                close={close}
                className="flex flex-col gap-8"
            >
                <Component reward={reward} />
            </ListingModalWrapper>
        </ModalOverlay>
    )
}

export default RuffleRewardModal
