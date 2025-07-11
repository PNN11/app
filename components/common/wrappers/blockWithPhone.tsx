import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import Image from 'next/image'

interface Props {
    background?: string
    image: string
    children: ReactNode
    classes?: { childrenWrapper?: string; wrapper?: string }
}

const BlockWithPhoneWrapper: FC<Props> = ({
    background = 'bg-bg',
    image,
    children,
    classes = { childrenWrapper: '', wrapper: '' },
}) => {
    const [minHeight, setMinHeight] = useState(0)

    const childrenRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const resizeHandler = (): void => {
            if (
                window.innerWidth > 768 &&
                imageRef.current.clientHeight < childrenRef.current.clientHeight
            ) {
                setMinHeight(childrenRef.current.clientHeight)
            }
        }

        resizeHandler()
        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return (
        <div
            className={`relative rounded-3xl ${background} md:flex md:items-end md:justify-end md:rounded-none md:bg-transparent ${classes.wrapper}`}
            data-aos="fade-zoom-in"
            style={{ minHeight }}
        >
            <div
                className={`bottom-px grid min-h-[25rem] w-full rounded-3xl ${background} md:absolute`}
            >
                <div
                    ref={childrenRef}
                    className={`space-y-9 py-6 px-5 sm:py-13 md:w-[calc(100%-18.25rem)] md:pl-7 lg:w-[calc(100%-22.75rem)] xl:w-7/12 xl:py-18 xl:pl-16 ${classes.childrenWrapper}`}
                >
                    {children}
                </div>
            </div>
            <div className="px-5 md:px-0" ref={imageRef}>
                <Image
                    src={image}
                    width={300}
                    height={514}
                    alt="Phone"
                    className="relative z-[2] mx-auto translate-y-px md:mr-7 md:h-113.75 md:w-66 md:translate-y-0 lg:h-128.5 lg:w-75 xl:mr-16"
                />
            </div>
        </div>
    )
}

export default BlockWithPhoneWrapper
