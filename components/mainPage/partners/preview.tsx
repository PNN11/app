import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

export interface PartnerPreviewProps {
    img: string
    alt: string
    href: string
    width: number
    height: number
}

const PartnerPreview: FC<PartnerPreviewProps> = ({ img, alt, href, height, width }) => {
    return (
        <Link
            target="_blank"
            href={href}
            className="grid h-20 w-[13.375rem] place-items-center rounded-xl bg-mediaKitCard bg-opacity-[0.12]"
            data-aos="fade-in-zoom"
        >
            <Image width={width} height={height} alt={alt} src={img} quality={100} priority />
        </Link>
    )
}

export default PartnerPreview
