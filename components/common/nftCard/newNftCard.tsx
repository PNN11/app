import { FC, useMemo, useRef } from 'react'

import NftCardInfo from './info'
import NftCardWrapper from './nftCardWrapper'
import NftPreview from './nftPreview'

import { IMarketplaceToken } from 'common-types/marketplace/marketplace-token'

interface NftCardProps {
    nft: IMarketplaceToken.TBodyResponse
}

const NftCard: FC<NftCardProps> = ({ nft }) => {
    const ref = useRef<HTMLVideoElement>(null)

    const href = useMemo(() => {
        if (nft.payload.resolution === 'TOKEN_ERC721') return `/nft/${nft._id}`

        return `/mysterybox/${nft._id}`
    }, [nft])

    return (
        <NftCardWrapper
            onMouseEnter={() => ref.current && ref.current.play()}
            onMouseLeave={() => ref.current && ref.current.pause()}
            href={href}
        >
            <NftPreview
                gameTitle={nft?.payload?.game?.title}
                logo={nft.payload.logo}
                name={nft.payload.name}
                preview={nft.payload.preview}
                ref={ref}
            />

            <NftCardInfo nft={nft} />
        </NftCardWrapper>
    )
}

export default NftCard
