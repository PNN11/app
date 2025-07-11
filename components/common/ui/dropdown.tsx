/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import { DropdownArrow } from 'components/svg/dropdownArrow'

type ClassesType = {
    activeItem?: string
    wrapper?: string
    item?: string
}

type PropsType<T> = {
    items: T[]
    activeItem: T | undefined
    setActiveItem: Dispatch<SetStateAction<T>>
    classes?: ClassesType
    className?: string
    placeholder?: string
    elementToLabel: (item: T) => JSX.Element | string
    onScrollEnd?: () => void
}
type DropdownType = <T = unknown>(props: PropsType<T>) => JSX.Element

export const Dropdown: DropdownType = ({
    items = [],
    activeItem,
    setActiveItem,
    classes = {
        activeItem: '',
        wrapper: '',
        item: '',
    },
    className = '',
    placeholder = '',
    elementToLabel,
    onScrollEnd,
}) => {
    const { ref, inView } = useInView({ threshold: 0 })
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const [isOpen, setIsOpen] = useState(false)

    const onClickItem = (item): void => {
        setActiveItem(item)
        setIsOpen(false)
    }

    useEffect(() => {
        if (inView) {
            onScrollEnd()
        }
    }, [inView, onScrollEnd])

    useEffect(() => {
        const onClick = (e: any): void => {
            if (!dropdownRef.current!.contains(e.target)) setIsOpen(false)
        }

        if (isOpen) {
            document.addEventListener('click', onClick)
        } else document.removeEventListener('click', onClick)

        return () => document.removeEventListener('click', onClick)
    }, [isOpen])

    return (
        <div className={`${classes.wrapper} relative box-border text-custom-sl`} ref={dropdownRef}>
            <div
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setIsOpen(prevState => !prevState)}
                className={`${classes.activeItem} flex w-full cursor-pointer items-center justify-between gap-2 rounded-2xl bg-base-800 p-3 hover:bg-base-600 focus:shadow-active focus:outline-none`}
                onClick={() => {
                    setIsOpen(e => !e)
                }}
            >
                <div className={`${className} text-base-100`}>
                    <div>{activeItem ? elementToLabel(activeItem) : placeholder}</div>
                </div>
                <DropdownArrow className={`${isOpen ? 'rotate-180' : ''} text-base-100`} />
            </div>
            <div
                className={`${className} ${
                    isOpen ? 'block' : 'hidden'
                } dropdownMenu absolute left-0 z-50 box-content w-full overflow-auto rounded-2xl bg-base-700`}
            >
                {items.map((item, index) => {
                    return (
                        <div
                            tabIndex={0}
                            onKeyDown={e => e.key === 'Enter' && onClickItem(item)}
                            key={+index}
                            className={`${classes.item} ${
                                activeItem === item ? 'bg-base-600' : 'bg-base-700'
                            } w-full items-center p-3 hover:cursor-pointer hover:bg-base-600 focus:bg-base-600 focus:outline-none`}
                            onClick={() => onClickItem(item)}
                        >
                            <div className="base-100">{elementToLabel(item)}</div>
                        </div>
                    )
                })}
                {onScrollEnd && <div ref={ref} />}
            </div>
        </div>
    )
}
