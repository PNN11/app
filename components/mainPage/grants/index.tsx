import { FC } from 'react'

import Image from 'next/image'

import MainPageBlockWrapper from '../blockWrapper'
import TitleWithColorWords from '../titleWithColorWords'

import { Container } from 'components/common/wrappers/container'

const grants = [
    {
        image: '/images/grants/georgian-agency2.png',
        alt: "Georgia's innovation and tehnology agency",
        width: 246,
        height: 48,
    },
    {
        image: '/images/grants/skale2.png',
        alt: 'Skale',
        width: 200,
        height: 66,
    },
]

const Grants: FC = () => {
    return (
        <MainPageBlockWrapper>
            <Container className="px-0 sm:px-0 xl:px-0">
                <TitleWithColorWords
                    title=""
                    colorWords="Grants"
                    classes={{ colorWords: 'bg-mainPagePartnersTitle' }}
                />

                <div className="flex flex-col items-center justify-center gap-10 sm:flex-row">
                    {grants.map(({ alt, image, width, height }) => (
                        <div
                            className="flex h-25 w-70 items-center justify-center rounded-xl bg-mediaKitCard bg-opacity-[0.12]"
                            key={image}
                        >
                            <Image src={image} alt={alt} width={width} height={height} />
                        </div>
                    ))}
                </div>
            </Container>
        </MainPageBlockWrapper>
    )
}

export default Grants
