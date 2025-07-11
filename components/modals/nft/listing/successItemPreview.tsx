import { FC } from 'react'

import Image from 'next/image'

interface SuccessItemPreviewProps {
    logo: string
    title: string
}

const SuccessItemPreview: FC<SuccessItemPreviewProps> = ({ logo, title }) => {
    return (
        <div className="flex flex-col items-center gap-6">
            <p className="text-custom-2.5xl font-medium">{title}</p>
            <div className="aspect-square w-[12.5rem] md:w-[15.625rem]">
                <Image src={logo} alt="nft cover" width={250} height={250} />
            </div>
        </div>
    )
}

export default SuccessItemPreview
