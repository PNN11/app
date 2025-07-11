import { FC } from 'react'

import { twMerge } from 'tailwind-merge'

interface TitleWithDescriptionProps {
    title: string
    description?: string
    subTitle?: string
    classes?: { wrapper?: string; title?: string; description?: string; subTitle?: string }
}

const TitleWithDescription: FC<TitleWithDescriptionProps> = ({
    title,
    description,
    subTitle,
    classes = { description: '', title: '', wrapper: '', subTitle: '' },
}) => {
    return (
        <div className={twMerge('mb-10', classes.wrapper)}>
            {subTitle && (
                <div
                    data-aos="fade-zoom-in"
                    className={`mb-5 text-center text-custom-lg font-medium lg:text-custom-2.5xl ${classes.subTitle}`}
                >
                    {subTitle}
                </div>
            )}
            <h5
                className={twMerge(
                    'mb-5 text-center text-custom-2.5xl font-medium lg:text-post-h1',
                    classes.title
                )}
                data-aos="fade-zoom-in"
            >
                {title}
            </h5>

            {description && (
                <div
                    className={twMerge(
                        'mx-auto max-w-profile-container text-center text-xl text-base-200',
                        classes.description
                    )}
                    data-aos="fade-zoom-in"
                    data-aos-delay="100"
                >
                    {description}
                </div>
            )}
        </div>
    )
}

export default TitleWithDescription
