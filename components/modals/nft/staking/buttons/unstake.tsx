import { FC } from 'react'

import ButtonWithUnstake from './withUnstake'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import SmallButton from 'components/common/ui/buttons/newSmallButton'

interface Props {
    nft: IMarketplaceToken.TBodyResponse
    onSuccess?: () => void
}

const UnstakeButton: FC<Props> = ({ nft, onSuccess }) => (
    <ButtonWithUnstake Component={SmallButton} nft={nft} onSuccess={onSuccess}>
        Unstake
    </ButtonWithUnstake>
)

export default UnstakeButton
