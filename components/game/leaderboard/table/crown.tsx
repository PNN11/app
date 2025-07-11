import { FC } from 'react'

import Image from 'next/image'

type CrownPropsType = {
    place: number
}

export const Crown: FC<CrownPropsType> = ({ place }) => {
    switch (place) {
        case 1:
            return (
                <Image
                    src="/img/games/goldCrown.svg"
                    alt="gold crown"
                    className="-ml-5 mr-2"
                    width={12}
                    height={12}
                />
            )
        case 2:
            return (
                <Image
                    src="/img/games/silverCrown.svg"
                    alt="silver crown"
                    className="-ml-5 mr-2"
                    width={12}
                    height={12}
                />
            )
        case 3:
            return (
                <Image
                    src="/img/games/bronzeCrown.svg"
                    alt="bronze crown"
                    className="-ml-5 mr-2"
                    width={12}
                    height={12}
                />
            )
        default:
            return null
    }
}
