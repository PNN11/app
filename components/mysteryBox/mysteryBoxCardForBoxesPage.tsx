import { FC } from 'react'

import Link from 'next/link'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'
import ImageWithSkeletonLoading from 'components/common/ui/loaders/image'
import { CardWrapper } from 'components/common/wrappers/cardWrapper'

interface MysteryBoxCardForBoxesPageProps {
    mysteryBox: IMarketplaceToken.TBodyResponse
}

const MysteryBoxCardForBoxesPage: FC<MysteryBoxCardForBoxesPageProps> = ({ mysteryBox }) => {
    return (
        <CardWrapper>
            <Link
                href={`/mysterybox/${mysteryBox._id}`}
                className="h-full rounded-2xl outline-none hover:shadow-card focus:shadow-active"
            >
                <ImageWithSkeletonLoading
                    src={mysteryBox.payload.logo}
                    alt={mysteryBox.payload.name}
                    width={336}
                    height={318}
                    className="w-full rounded-2xl object-cover object-center"
                    classes={{ skeleton: 'rounded-2xl' }}
                />
            </Link>
        </CardWrapper>
    )
}

export default MysteryBoxCardForBoxesPage
