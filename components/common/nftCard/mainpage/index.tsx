import { FC, useRef } from 'react'

import NftCardInfoForMainPage from '../infoForMainPage'
import NftCardWrapper from '../nftCardWrapper'
import NftPreview from '../nftPreview'

import { Core } from 'common-types/core'
import { MainPage } from 'common-types/mainPage'

interface NftCardForMainPageProps {
    nft: MainPage.MarketplaceToken
}

const NftCardForMainPage: FC<NftCardForMainPageProps> = ({ nft }) => {
    const ref = useRef<HTMLVideoElement>(null)

    return (
        <NftCardWrapper
            onMouseEnter={() => ref.current && ref.current.play()}
            onMouseLeave={() => ref.current && ref.current.pause()}
            href={`/nft/${nft.id}`}
        >
            <NftPreview
                gameTitle={nft?.payload?.gameId?.title}
                logo={(nft.payload.logo as Core.Media).url}
                name={nft.payload.name}
                preview={(nft.payload.preview as Core.Media).url}
                ref={ref}
            />

            <NftCardInfoForMainPage
                name={nft.payload.name}
                price={nft.priceAmount}
                symbol={nft.currencyId.symbol}
            />
        </NftCardWrapper>
    )
}

export default NftCardForMainPage
