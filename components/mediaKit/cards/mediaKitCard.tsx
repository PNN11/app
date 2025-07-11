import { FC } from 'react'

import Image from 'next/image'

import ImgDownload from '../imgDownloadButton'

interface MediaKitCardProps {
    title: string
    imgSrcForShow: string
    imgSrcForDownload: string[]
    imgWidth: number
    imgHeight: number
    imgClassName?: string
}

const MediaKitCard: FC<MediaKitCardProps> = ({
    title,
    imgSrcForShow,
    imgSrcForDownload,
    imgWidth,
    imgHeight,
    imgClassName,
}) => {
    return (
        <div className="flex w-78.5 flex-col gap-4 rounded-xl bg-mediaKitCard/12 px-6 py-5 backdrop-blur-2xl">
            <div className="text-sm tracking-[0.025rem]">{title}</div>
            <div className="flex flex-col items-center gap-1.5">
                <Image
                    src={imgSrcForShow}
                    width={imgWidth}
                    height={imgHeight}
                    alt={title}
                    quality={100}
                    className={imgClassName ?? ''}
                />
                <div className="flex items-center justify-center gap-24 font-medium text-cta-100">
                    {imgSrcForDownload.map(el => (
                        <ImgDownload key={el} imgSrcForDownload={el} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MediaKitCard
