import { FC } from 'react'

import Image from 'next/image'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

const colors = [
    { title: 'Primary', colorGroup: ['#840E2A', '#FF4774', '#6F8EC3'] },
    { title: 'Secondary', colorGroup: ['#FFFFFF', '#0D1420', '#191919'] },
]

const Colors: FC = () => {
    return (
        <BlockWrapper className="relative xl:mb-40">
            <TitleWithDescription title="Colors" classes={{ title: 'mb-6' }} />
            <div
                className="relative z-[1] flex flex-wrap justify-center gap-4 gap-y-8"
                data-aos="fade-zoom-in"
            >
                {colors.map(el => (
                    <div key={el.title} className="flex flex-col items-center gap-2 md:items-start">
                        <div>{el.title}</div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {el.colorGroup.map(color => (
                                <div key={color} className="flex flex-col items-center gap-3">
                                    <div
                                        style={{ background: color }}
                                        className="h-51 w-51 rounded-xl"
                                    />
                                    <div className="text-custom-xs tracking-[0.025rem]">
                                        {color}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Image
                width={1309}
                height={1172}
                src="/images/mediaKit/ellipse_5.png"
                alt="blur"
                className="absolute top-1/4 right-1/2 2xl:-top-20"
                data-aos="fade-zoom-in"
            />
            <Image
                width={1006}
                height={914}
                src="/images/mediaKit/ellipse_6.png"
                alt="blur"
                className="absolute top-0 right-[15%] "
                data-aos="fade-zoom-in"
            />
            <Image
                width={1056}
                height={1274}
                src="/images/mediaKit/ellipse_7.png"
                alt="blur"
                className="absolute top-1/4 left-1/2 xl:top-0 xl:left-2/4"
                data-aos="fade-zoom-in"
            />
        </BlockWrapper>
    )
}

export default Colors
