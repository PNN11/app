import { FC } from 'react'

import Link from 'next/link'

import Badge from '../ui/badges/newBadge'
import ImageWithSkeletonLoading from '../ui/loaders/image'
import TranslateCardWrapper from '../wrappers/translateCard'

interface Props {
    preview: string
    nftsCount: number
    classes?: { image?: string }
    name: string
    _id: string
}

const CollectionCard: FC<Props> = ({ nftsCount, preview, classes, name, _id }) => {
    return (
        <Link
            href={_id ? `/staking/${_id}` : '/staking'}
            className="group/translate-card block cursor-pointer pb-4"
        >
            <TranslateCardWrapper>
                <ImageWithSkeletonLoading
                    src={preview}
                    width={427}
                    height={240}
                    alt={name}
                    className={`aspect-video w-full select-none rounded-xl object-cover ${
                        classes?.image ?? ''
                    }`}
                    classes={{ skeleton: 'rounded-xl' }}
                />
                <div className="py-4">
                    {nftsCount ? (
                        <Badge className="mb-2 w-fit bg-base-800 text-sm leading-6 tracking-wide">
                            Items listed:{nftsCount}
                        </Badge>
                    ) : null}
                    <h5 className="text-xl font-semibold">{name}</h5>
                </div>
            </TranslateCardWrapper>
        </Link>
    )
}

export default CollectionCard
