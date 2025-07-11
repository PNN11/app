import { FC } from 'react'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { DefaultButtonProps } from './types'

type ButtonVariant = 'contained' | 'outlined'

type ButtonColorScheme = 'primary' | 'white'

export type ButtonProps = DefaultButtonProps & {
    variant?: ButtonVariant
    isLoading?: boolean
    color?: ButtonColorScheme
}

const SmallButton: FC<ButtonProps> = ({
    children,
    variant = 'contained',
    className = '',
    isLoading = false,
    disabled = false,
    color = 'primary',
    ...props
}) => {
    const buttonVariants: Record<ButtonVariant, Partial<Record<ButtonColorScheme, string>>> = {
        contained: {
            primary: 'border-transparent bg-cta hover:bg-cta-600 disabled:bg-cta',
            white: 'border-transparent bg-base-100 hover:bg-base-200 text-bg disabled:opacity-50 font-semibold',
        },
        outlined: {
            primary: 'border-base-600 bg-base-800 hover:bg-base-700 disabled:bg-base-100/10',
        },
    }

    const defaultStyle = buttonVariants.contained.primary

    const buttonStyle = buttonVariants[variant][color] ?? defaultStyle

    return (
        <button
            type="button"
            disabled={disabled || isLoading}
            className={twMerge(
                `flex items-center justify-center rounded-2xl border px-3 py-1.75 text-custom-sl leading-6 text-base-100 transition-all
            duration-300 disabled:opacity-50 ${buttonStyle}`,
                className
            )}
            {...props}
        >
            {isLoading ? (
                <Image
                    src="/img/loader.png"
                    alt="loading"
                    height={20}
                    width={20}
                    className="loading"
                />
            ) : (
                children
            )}
        </button>
    )
}

export default SmallButton
