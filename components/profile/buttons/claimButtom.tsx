import { FC, MouseEvent } from 'react'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import SmallButton from 'components/common/ui/buttons/smallButton'
import ClaimModal from 'components/modals/nft/claim'
import { useModal } from 'hooks/useModal'

interface ClaimButtonProps {
    nft: IMarketplaceToken.TBodyResponse
}

const ClaimButtom: FC<ClaimButtonProps> = ({ nft }) => {
    const [isOpen, open, close] = useModal(false)

    const handleClick = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.stopPropagation()
        e.preventDefault()
        open()
    }

    return (
        <>
            <SmallButton className="w-full" onClick={handleClick} variant="inline">
                Claim
            </SmallButton>
            <ClaimModal open={open} isOpen={isOpen} close={close} nft={nft} />
        </>
    )
}

export default ClaimButtom
