import { forwardRef } from 'react'

interface Props {
    title: string
    description: string
}

const PassInfo = forwardRef<HTMLDivElement, Props>(({ description, title }, ref) => {
    return (
        <div ref={ref} className="py-5" data-aos="fade-zoom-in">
            <h5 className="mb-5 text-6xl font-medium lg:text-7xl xl:text-title xl:leading-[1.08]">
                {title}
            </h5>
            <div className="text-3xl lg:text-custom-4xl xl:text-custom-6xl">{description}</div>
        </div>
    )
})

export default PassInfo
