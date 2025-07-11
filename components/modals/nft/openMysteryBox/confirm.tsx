import { FC } from 'react'

import Link from 'next/link'

import SuccessItemPreview from '../listing/successItemPreview'
import ModalWrapper from '../listing/wrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { IModal } from 'components/modals/interfaces/modalInterface'
import useOpenMysteryBox from 'hooks/useOpenMysteryBox'
import useRequireWallet from 'hooks/useRequireWallet'
import { getNftChainId } from 'utils/nft/getNftChainId'

type OpenMysteryBoxConfirmProps = IModal & {
    mysteryBox: IMarketplaceToken.TBodyResponse
    onConfirm: (token: IMarketplaceToken.TBodyResponse) => void
}

const OpenMysteryBoxConfirm: FC<OpenMysteryBoxConfirmProps> = ({
    mysteryBox,
    close,
    onConfirm,
}) => {
    const requireWallet = useRequireWallet()
    const { openMysteryBox, approveProcessing, openProcessing, getTokenProcessing } =
        useOpenMysteryBox()

    const onOpen = async (): Promise<void> => {
        await requireWallet(async () => {
            const token = await openMysteryBox(mysteryBox)

            if (token) {
                onConfirm(token)
            }
        }, getNftChainId(mysteryBox))
    }

    return (
        <ModalWrapper title="Mystery box" close={close} className="flex flex-col gap-8">
            <SuccessItemPreview logo={mysteryBox.payload.logo} title={mysteryBox.payload.name} />

            <div className="grid grid-cols-2 gap-8">
                <Link
                    href={{
                        pathname: '/profile',
                        query: {
                            'filter[profileTab]': 'My NFTs',
                        },
                    }}
                >
                    <MarketplaceButton variant="secondary">My collections</MarketplaceButton>
                </Link>
                <MarketplaceButton
                    isLoading={approveProcessing || openProcessing || getTokenProcessing}
                    onClick={onOpen}
                >
                    Open box
                </MarketplaceButton>
            </div>
        </ModalWrapper>
    )
}

export default OpenMysteryBoxConfirm
