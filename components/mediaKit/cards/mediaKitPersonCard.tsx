import { FC } from 'react'

import Image from 'next/image'

import ImgDownload from '../imgDownloadButton'

interface MediaKitPersonCardProps {
    imgSrcForShow: string
    imgSrcForDownload: string
    title: string
}

const MediaKitPersonCard: FC<MediaKitPersonCardProps> = ({
    imgSrcForShow,
    imgSrcForDownload,
    title,
}) => {
    return (
        <div className="flex flex-col gap-3">
            <Image height={321} width={317} alt="people" src={imgSrcForShow} quality={100} />
            <div className="flex justify-between">
                <span>{title}</span>
                <ImgDownload imgSrcForDownload={imgSrcForDownload} />
            </div>
        </div>
    )
}

export default MediaKitPersonCard
