import { forwardRef } from 'react'

import Badge from '../ui/badges/newBadge'
import ImageWithSkeletonLoading from '../ui/loaders/image'

import { formatSrc } from 'utils/nft/img'

interface NftPreviewProps {
    logo: string
    preview?: string
    gameTitle?: string
    name: string
}

const NftPreview = forwardRef<HTMLVideoElement, NftPreviewProps>(
    ({ gameTitle, logo, preview, name }, ref) => {
        return (
            <div className="relative">
                <ImageWithSkeletonLoading
                    src={formatSrc(logo)}
                    width={426}
                    height={426}
                    alt={name}
                    className={`aspect-square w-full rounded-t-xl ${
                        preview ? 'group-hover:opacity-0' : ''
                    }`}
                    quality={100}
                />
                {preview && (
                    <video
                        poster={logo}
                        muted
                        preload="metadata"
                        ref={ref}
                        loop
                        className="absolute inset-0 rounded-t-xl opacity-0 group-hover:opacity-100"
                    >
                        <source src={preview} />
                    </video>
                )}
                {gameTitle && (
                    <Badge className="absolute top-3 right-3 z-[2] bg-bg/20">{gameTitle}</Badge>
                )}
            </div>
        )
    }
)

export default NftPreview
