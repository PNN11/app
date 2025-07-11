import { FC } from 'react'

import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { twMerge } from 'tailwind-merge'

import StepCard from 'components/profile/referralInfo/cards/step'

export interface StepType {
    id: number
    title: string | JSX.Element
    description: string | JSX.Element
}

interface StepsProps {
    steps: StepType[]
    children?: React.ReactNode
    className?: string
}

const Steps: FC<StepsProps> = ({ steps, children, className }) => {
    return (
        <div
            className={twMerge(
                'mb-8 grid gap-3 pt-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4',
                className
            )}
        >
            {steps.map((step, index) => (
                <StepCard
                    className="hidden sm:block"
                    step={index + 1}
                    title={step.title}
                    key={step.id}
                >
                    {step.description}
                </StepCard>
            ))}
            <Swiper
                className="sm:hidden"
                pagination={{
                    bulletActiveClass: '!bg-cta',
                    bulletClass: 'w-2.5 h-2.5 rounded-lg inline-block bg-base-600',
                    horizontalClass: 'referral-slider-pagination',
                }}
                modules={[Pagination]}
            >
                {steps.map((step, index) => (
                    <SwiperSlide key={step.id}>
                        <StepCard className="h-full" step={index + 1} title={step.title}>
                            {step.description}
                        </StepCard>
                    </SwiperSlide>
                ))}
            </Swiper>
            {children}
        </div>
    )
}

export default Steps
