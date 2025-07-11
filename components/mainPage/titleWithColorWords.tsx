import { FC, ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface TitleWithColorWordsProps {
    title: ReactNode
    subtitle?: string
    colorWords: string
    classes?: { colorWords?: string; title?: string; subtitle?: string }
}

const TitleWithColorWords: FC<TitleWithColorWordsProps> = ({
    title,
    colorWords,
    classes,
    subtitle,
}) => {
    return (
        <div data-aos="fade-in-zoom">
            <h5
                className={`text-center text-[3.125rem] font-bold leading-none tracking-tight md:text-6xl ${
                    subtitle ? 'mb-6' : 'mb-8'
                } ${classes?.title ?? ''}`}
            >
                {title}
                <span
                    className={twMerge(
                        `bg-mainPageBenefitsTitle bg-clip-text text-transparent`,
                        classes?.colorWords
                    )}
                >
                    {colorWords}
                </span>
            </h5>
            {!!subtitle && (
                <h6
                    className={`mb-8 text-center text-xl leading-7 text-base-150 ${
                        classes?.subtitle ?? ''
                    }`}
                >
                    {subtitle}
                </h6>
            )}
        </div>
    )
}

export default TitleWithColorWords
