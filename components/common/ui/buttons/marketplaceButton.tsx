import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type DefaultButtonPropsType = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>
type ButtonPropsType = DefaultButtonPropsType & {
    isLoading?: boolean
    variant?: 'primary' | 'inline' | 'secondary'
}

export const MarketplaceButton: FC<ButtonPropsType> = ({
    children,
    className,
    disabled,
    isLoading,
    variant = 'primary',
    ...restProps
}) => {
    const _className = twMerge(
        `${
            isLoading
                ? 'py-3.5 hover:bg-cta'
                : 'cursor-pointer py-4 disabled:cursor-default disabled:opacity-50'
        } 
    ${variant === 'primary' ? 'bg-cta hover:bg-cta-600 disabled:hover:bg-cta' : ''}
    ${
        variant === 'secondary'
            ? 'border border-link text-link hover:border-cta-600 hover:bg-cta-600 hover:text-base-100'
            : ''
    }
    ${
        variant === 'inline'
            ? 'border border-base-100 border-opacity-50 text-base-100 hover:border-opacity-100 hover:bg-base-100 hover:bg-opacity-10'
            : ''
    }
    ${disabled ? 'opacity-50' : 'hover:bg-cta-600'} 
    box-border flex w-full items-center justify-center rounded-2xl px-4 text-custom-lg focus:shadow-active focus:outline-none`,
        className
    )

    return (
        <button
            type="button"
            className={_className}
            disabled={disabled || isLoading}
            {...restProps}
        >
            {isLoading ? (
                <Image
                    src="/img/loader.png"
                    alt="loading"
                    height={24}
                    width={24}
                    className="loading"
                />
            ) : (
                children
            )}
        </button>
    )
}
