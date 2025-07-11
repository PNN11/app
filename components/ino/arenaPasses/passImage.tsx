import { FC } from 'react'

import Image from 'next/image'

interface Props {
    image: string
    visible: boolean
}

const PassImage: FC<Props> = ({ image, visible }) => {
    return (
        <Image
            src={image}
            width={648}
            height={648}
            alt="Pass"
            className={`absolute left-0 top-0 w-full rounded-xl transition ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
        />
    )
}

export default PassImage
