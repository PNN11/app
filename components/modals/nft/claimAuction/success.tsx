import { FC } from 'react'

import ClaimModalWrapper from '../listing/wrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { IModal } from 'components/modals/interfaces/modalInterface'

type PropsType = IModal & {
    onDone: () => void
    nft: IMarketplaceToken.TBodyResponse
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SuccessClaim: FC<PropsType> = ({ nft, close, onDone }) => {
    return (
        <ClaimModalWrapper title="Claim completed" close={close} className="flex flex-col gap-8">
            <MarketplaceButton
                onClick={() => {
                    onDone()
                }}
                className="w-full"
            >
                Done
            </MarketplaceButton>
        </ClaimModalWrapper>
    )
}

export default SuccessClaim
