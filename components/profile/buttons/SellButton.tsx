import { FC } from 'react'

import Link from 'next/link'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import SmallButton from 'components/common/ui/buttons/smallButton'

type PropsType = { nft: IMarketplaceToken.TBodyResponse }

export const SellButton: FC<PropsType> = ({ nft }) => {
    return (
        <Link href={`/nft/sell/${nft._id}`}>
            <SmallButton variant="inline" className="w-full">
                Sell
            </SmallButton>
        </Link>
    )
}
