import { FC, useRef } from 'react'

import NftInfoWrapper from '../infoWrapper'
import NftPreview from '../nftPreview'

import { Nft } from 'utils/types/TextContentType'

interface NftCardForMainPageProps {
    nft: Nft
}

const NftCardForMainPageMock: FC<NftCardForMainPageProps> = ({ nft }) => {
    const ref = useRef<HTMLVideoElement>(null)

    return (
        <div className="group">
            <div
                className="group flex cursor-pointer flex-col overflow-hidden transition-all duration-300 group-hover:-translate-y-3"
                onMouseEnter={() => ref.current && ref.current.play()}
                onMouseLeave={() => ref.current && ref.current.pause()}
            >
                <NftPreview
                    logo={nft.payload.logo}
                    name={nft.payload.name}
                    preview={nft.preview}
                    ref={ref}
                />
                <NftInfoWrapper>
                    <div className="font-medium">{nft.payload.name}</div>
                </NftInfoWrapper>
            </div>
        </div>
    )
}

export default NftCardForMainPageMock
