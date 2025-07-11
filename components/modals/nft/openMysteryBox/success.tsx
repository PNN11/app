import { FC } from 'react'

import Link from 'next/link'

import SuccessItemPreview from '../listing/successItemPreview'
import ModalWrapper from '../listing/wrapper'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import { MarketplaceButton } from 'components/common/ui/buttons/marketplaceButton'
import { IModal } from 'components/modals/interfaces/modalInterface'

type OpenMysteryBoxSuccessProps = IModal & {
    token: IMarketplaceToken.TBodyResponse
    mysteryBox: IMarketplaceToken.TBodyResponse
    onDone: () => void
}

const OpenMysteryBoxSuccess: FC<OpenMysteryBoxSuccessProps> = ({
    close,
    token,
    onDone,
    mysteryBox,
}) => {
    return (
        <ModalWrapper title="Mystery box" close={close} className="flex flex-col gap-8">
            <Link href={`/nft/${token._id}`}>
                <SuccessItemPreview logo={token.payload.logo} title={token.payload.name} />
            </Link>

            <div className="grid grid-cols-2 gap-8">
                <Link href={`/mysterybox/${mysteryBox._id}`}>
                    <MarketplaceButton variant="secondary">Go back</MarketplaceButton>
                </Link>
                <Link
                    href={{
                        pathname: '/profile',
                        query: {
                            'filter[profileTab]': 'My NFTs',
                        },
                    }}
                >
                    <MarketplaceButton onClick={onDone}>My collections</MarketplaceButton>
                </Link>
            </div>
        </ModalWrapper>
    )
}

export default OpenMysteryBoxSuccess
