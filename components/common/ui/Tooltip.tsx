import { FC, ReactNode, useState } from 'react'

import { flip, shift, useFloating, useHover, useInteractions } from '@floating-ui/react'

import InfoSvg from 'components/svg/InfoSvg'

type PropsType = {
    text?: ReactNode
    children?: ReactNode
    className?: string
}
const Tooltip: FC<PropsType> = ({ text = 'Info', children, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false)

    const { x, y, floating, strategy, context, refs } = useFloating({
        placement: 'top',
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [shift(), flip()],
    })

    const hover = useHover(context)

    const { getReferenceProps, getFloatingProps } = useInteractions([hover])

    return (
        <>
            <div ref={refs.setReference} {...getReferenceProps()} className={className}>
                {children || <InfoSvg className="group" width={16} height={16} />}
            </div>
            {isOpen && (
                <div
                    ref={refs.setFloating}
                    {...getFloatingProps({
                        ref: floating,
                        style: {
                            position: strategy,
                            zIndex: 30,
                            top: y ?? 0,
                            left: x ?? 0,
                        },
                    })}
                    className="-my-1 w-max max-w-[16rem] rounded-2xl bg-base-700 px-3 py-2 text-center text-custom-sl md:max-w-[20rem]"
                >
                    {text}
                </div>
            )}
        </>
    )
}

export default Tooltip
