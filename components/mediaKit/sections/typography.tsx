import { FC } from 'react'

import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

const typography = [
    {
        title: 'Headline: Qanelas Extrabold',
        className: 'text-custom-5xl font-extrabold',
    },
    {
        title: 'Headline: Qanelas Medium',
        className: 'text-38 font-medium',
    },
    {
        title: 'Body: Qanelas Regular',
        className: 'text-xl pt-3',
    },
]

const Typography: FC = () => {
    return (
        <BlockWrapper className="relative z-[1] xl:mb-40">
            <TitleWithDescription title="Design Typography" classes={{ title: 'mb-6' }} />
            <div className="flex flex-wrap justify-center gap-4" data-aos="fade-zoom-in">
                {typography.map(el => (
                    <div
                        key={el.title}
                        className="flex h-28.5 w-64 flex-col items-center gap-1.5 rounded-xl 
                    bg-mediaKitCard/12 px-6 py-5 backdrop-blur-2xl 3xs:w-70"
                    >
                        <div>{el.title}</div>
                        <div className={el.className}>Qanelas</div>
                    </div>
                ))}
            </div>
        </BlockWrapper>
    )
}

export default Typography
