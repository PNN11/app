import { FC } from 'react'

import Image from 'next/image'

import Journey, { JourneyProps } from './journey'
import PerksOfThePriveleged, { PerksOfThePrivelegedProps } from './perks'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

interface Props {
    title: string

    perks: PerksOfThePrivelegedProps
    journey: JourneyProps
}

const Privileges: FC<Props> = ({ title, perks, journey }) => {
    return (
        <div className="relative">
            <Image
                src="/images/ino/privileges-bg.png"
                width={763}
                height={1223}
                alt="Background"
                className="absolute top-110 right-0 hidden lg:block"
            />
            <Container>
                <BlockWrapper>
                    <TitleWithDescription title={title} />
                    <PerksOfThePriveleged {...perks} />
                    <Journey {...journey} />
                </BlockWrapper>
            </Container>
        </div>
    )
}

export default Privileges
