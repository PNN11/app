import { FC } from 'react'

import Image from 'next/image'

export interface ImgDownloadProps {
    imgSrcForDownload: string
}

const ImgDownloadButton: FC<ImgDownloadProps> = ({ imgSrcForDownload }) => {
    return (
        <a href={imgSrcForDownload} download>
            <div className="flex gap-2">
                <Image
                    src="/images/mediaKit/circle-arrow-down.svg"
                    width={24}
                    height={24}
                    alt="Download"
                />
                <span>{imgSrcForDownload.split('.')[1].toUpperCase()}</span>
            </div>
        </a>
    )
}

export default ImgDownloadButton
