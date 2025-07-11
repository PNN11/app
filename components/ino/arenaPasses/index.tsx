import { FC, useCallback, useState } from 'react'

import Image from 'next/image'
import useResizeObserver from 'use-resize-observer'

import PassImage from './passImage'
import TrackPassVisibilityWrapper from './passWrapper'

import { Pages } from 'common-types/pages'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import { Container } from 'components/common/wrappers/container'
import TitleWithDescription from 'components/mainPage/titleWIthDescription'

interface Props {
    title: string
    description: string
    passes: (Pages.Pass & { image: string })[]
}

const defaultTopOffset = 81

const ArenaPasses: FC<Props> = ({ description, title, passes }) => {
    const [visiblePass, setVisiblePass] = useState<string>(passes?.[0]?.type)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [imageTopOffset, setImageTopOffset] = useState(defaultTopOffset)
    const { ref } = useResizeObserver({
        onResize: size => {
            setImageTopOffset(size.height + defaultTopOffset)
        },
    })

    const handleChangeVisiblePass = useCallback(
        ({ inView, type }: { inView: boolean; type: string }): void => {
            if (inView) setVisiblePass(type)
        },
        []
    )

    return (
        <div>
            <Container>
                <BlockWrapper>
                    <div className="hidden grid-cols-2 gap-4 md:grid">
                        <div
                            className="sticky top-13 z-[2] col-span-full bg-bg lg:top-20"
                            ref={ref}
                        >
                            <TitleWithDescription
                                title={title}
                                description={description}
                                classes={{ description: '2xs:max-w-full' }}
                            />
                        </div>
                        <div className="space-y-13 pb-13">
                            {passes.map(pass => (
                                <TrackPassVisibilityWrapper
                                    key={pass.type}
                                    {...pass}
                                    onInViewChange={handleChangeVisiblePass}
                                />
                            ))}
                        </div>

                        <div
                            style={{ top: imageTopOffset }}
                            className="sticky aspect-square"
                            data-aos="fade-zoom-in"
                        >
                            {passes.map(pass => (
                                <PassImage
                                    key={pass.type}
                                    visible={visiblePass === pass.type}
                                    image={pass.image}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <TitleWithDescription title={title} description={description} />
                        <div className="mb-5 flex items-center justify-between">
                            {passes.map((pass, index) => (
                                <button
                                    className={`border-b p-2 text-28 leading-8 ${
                                        visiblePass === pass.type
                                            ? 'border-base-100 text-base-100'
                                            : 'border-transparent text-base-300'
                                    }`}
                                    type="button"
                                    key={pass.type}
                                    onClick={() => {
                                        setVisiblePass(pass.type)
                                        setCurrentIndex(index)
                                    }}
                                >
                                    {pass.title}
                                </button>
                            ))}
                        </div>
                        <div>
                            <Image
                                src={passes[currentIndex].image}
                                width={648}
                                height={648}
                                alt="Pass"
                                className="mb-7 rounded-xl"
                            />
                            <div className="text-2xl">{passes[currentIndex].description}</div>
                        </div>
                    </div>
                </BlockWrapper>
            </Container>
        </div>
    )
}

export default ArenaPasses
