import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import Image from 'next/image'

type DefaultButtonPropsType = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

interface ISubmitButton extends DefaultButtonPropsType {
    children: string | JSX.Element
    className?: string
    handleClick?: () => void
    disabled?: boolean
    isLoading?: boolean
}

const SubmitButton: FC<ISubmitButton> = ({
    children,
    className = '',
    handleClick,
    disabled = false,
    isLoading,
    ...restProps
}) => {
    return (
        <button
            type="button"
            className={`block flex w-full items-center justify-center rounded-2xl bg-cta p-4 text-custom-lg shadow-button focus:shadow-active focus:outline-none ${
                !isLoading && 'hover:bg-cta-600'
            } ${disabled && 'opacity-50 hover:bg-cta'} ${className}`}
            disabled={disabled || isLoading}
            onClick={handleClick}
            {...restProps}
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

export default SubmitButton
