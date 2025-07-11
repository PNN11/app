import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

import Image from 'next/image'

export type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>

type PropsType = DefaultInputPropsType

export const Checkbox: FC<PropsType> = ({ className, checked, tabIndex = 0, id, ...restProps }) => {
    return (
        <label
            htmlFor={id}
            tabIndex={tabIndex}
            className={`flex h-5 w-5 items-center justify-center rounded-[0.3125rem] border border-base-300 border-opacity-30 hover:cursor-pointer ${className} ${
                checked ? 'border-0 bg-cta' : ''
            }`}
        >
            <input
                {...restProps}
                checked={checked}
                type="checkbox"
                className="absolute cursor-pointer opacity-0 transition-none"
                id={id}
            />
            {checked && <Image src="/img/checked.svg" alt="checked icon" width={10} height={7} />}
        </label>
    )
}
