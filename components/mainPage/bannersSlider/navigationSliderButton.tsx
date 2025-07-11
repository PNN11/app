import { FC } from 'react'

import SliderArrow from 'components/svg/newSliderArrow'

interface NavigationSliderButtonProps {
    className?: string
}

const NavigationSliderButton: FC<NavigationSliderButtonProps> = ({ className }) => {
    return (
        <div
            className={`z-10 flex h-8 w-8 cursor-pointer select-none items-center justify-center rounded-full bg-base-100/25 text-base-100 ${className}`}
            onClick={e => {
                e.stopPropagation()
            }}
        >
            <SliderArrow />
        </div>
    )
}

export default NavigationSliderButton
