import { FC } from 'react'

import ListingModalWrapper from '../listing/wrapper'

import StakeButton from './buttons/stake'
import UnstakeButton from './buttons/unstake'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import SmallButton from 'components/common/ui/buttons/newSmallButton'
import ImageWithSkeletonLoading from 'components/common/ui/loaders/image'
import { ModalOverlay } from 'components/modals/overlay'
import { promisifyModal } from 'components/modals/promissify'
import { ConfirmableProps } from 'components/modals/promissify/types'

type Result = {
    nft: IMarketplaceToken.TBodyResponse
    type: 'stake' | 'unstake'
}

type Props = ConfirmableProps<Result> & {
    nft: IMarketplaceToken.TBodyResponse
}

const StakeNftModal: FC<Props> = ({ nft, proceed, show, cancel }) => {
    const onClose = (): void => cancel()
    const onSuccessStake = (): void => proceed({ nft, type: 'stake' })
    const onSuccessUnstake = (): void => proceed({ nft, type: 'unstake' })

    const isStaked = nft.payload.type === 'MINT' && nft.payload.isStaked

    return (
        <ModalOverlay isOpen={show} onClose={onClose}>
            <ListingModalWrapper
                title="Stake your NFTs"
                close={onClose}
                classes={{ wrapper: '2xs:max-w-162', title: 'text-custom-2.5xl font-medium' }}
            >
                <h5 className="mb-3 text-center text-xl">
                    Are you sure you want to {isStaked ? 'unstake' : 'stake'} {nft.payload.name}?
                </h5>
                <div className="mb-8 flex items-center justify-center">
                    <ImageWithSkeletonLoading
                        src={nft.payload.logo}
                        width={248}
                        height={248}
                        alt={nft.payload.name}
                        className="rounded"
                        classes={{ skeleton: 'rounded-t rounded-b' }}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <SmallButton variant="outlined" onClick={onClose}>
                        Cancel
                    </SmallButton>
                    {isStaked ? (
                        <UnstakeButton nft={nft} onSuccess={onSuccessUnstake} />
                    ) : (
                        <StakeButton nft={nft} onSuccess={onSuccessStake} />
                    )}
                </div>
            </ListingModalWrapper>
        </ModalOverlay>
    )
}

const openStakeNftModal = promisifyModal(StakeNftModal)

export default openStakeNftModal
