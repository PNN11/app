import { FC } from 'react'

import { twMerge } from 'tailwind-merge'

type Props<T> = {
    Component: FC<T>
    data: T[]
    keyForComponent: (data: T, index: number) => string
    className?: string
    slideAnimationDuration?: number
    isOverlayAdded?: boolean
}

type SliderWithAutoplayFunc = <T>(props: Props<T>) => JSX.Element

const SliderWithAutoplay: SliderWithAutoplayFunc = ({
    Component,
    data,
    keyForComponent,
    className = '',
    slideAnimationDuration = 3,
    isOverlayAdded = true,
}) => {
    return (
        <div className={twMerge('relative flex select-none gap-5 overflow-hidden', className)}>
            {isOverlayAdded && <div className="marque-overlay absolute h-full w-full" />}
            <div
                style={{ animationDuration: `${slideAnimationDuration * data.length}s` }}
                className="marquee flex min-w-full shrink-0 justify-around gap-5"
            >
                {data.map((props, i) => (
                    <Component key={keyForComponent(props, i)} {...props} index={i} />
                ))}
            </div>
            <div
                style={{ animationDuration: `${slideAnimationDuration * data.length}s` }}
                className="marquee flex min-w-full shrink-0 justify-around gap-5"
            >
                {data.map((props, i) => (
                    <Component
                        key={keyForComponent(props, i + data.length)}
                        {...props}
                        index={i + data.length}
                    />
                ))}
            </div>
        </div>
    )
}

export default SliderWithAutoplay
