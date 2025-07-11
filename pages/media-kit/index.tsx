import { NextPage } from 'next'
import Image from 'next/image'

import { Container } from 'components/common/wrappers/container'
import NegativeTopMarginWrapper from 'components/common/wrappers/negativeTopMargin'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'
import Assets from 'components/mediaKit/sections/assets'
import Colors from 'components/mediaKit/sections/colors'
import Description from 'components/mediaKit/sections/description'
import Logos from 'components/mediaKit/sections/logos'
import People from 'components/mediaKit/sections/people'
import Posts from 'components/mediaKit/sections/posts'
import Typography from 'components/mediaKit/sections/typography'

const MediaKit: NextPage = () => {
    return (
        <NegativeTopMarginWrapper className="relative overflow-hidden">
            <Container className="mt-35 lg:mt-45">
                <div className="relative w-[117rem]">
                    <Image
                        src="/images/mediaKit/ellipse_1.png"
                        width={1878}
                        height={1573}
                        alt="blur"
                        className="absolute right-110 bottom-[-45rem] -mt-20 xs:right-100 md:right-50"
                        data-aos="fade-zoom-in"
                    />
                </div>
                <TitleWithDescription
                    title="Arena Games Media Kit"
                    description="Welcome to the Arena Games Media Kit, your go-to resource for
                            comprehensive information about our company."
                    classes={{
                        title: 'mb-6 text-custom-6xl font-bold tracking-tighter md:text-64 lg:text-80',
                        wrapper: 'mb-25',
                        description: ' md:max-w-2xl',
                    }}
                />
                <Description />
                <Logos />
                <Colors />
                <Assets />
                <Typography />
                <People />
                <Posts />
            </Container>
        </NegativeTopMarginWrapper>
    )
}

export default MediaKit
