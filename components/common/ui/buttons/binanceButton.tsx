import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import Image from 'next/image'

type DefaultButtonPropsType = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

interface IBinanceButton extends DefaultButtonPropsType {
    children: string | JSX.Element
    className?: string
    handleClick?: () => void
    isDisabled?: boolean
    isLoading?: boolean
}

const BinanceButton: FC<IBinanceButton> = ({
    children,
    className = '',
    handleClick,
    isDisabled = false,
    isLoading,
    ...restProps
}) => {
    return (
        <button
            type="button"
            className={`flex w-full items-center justify-center rounded-2xl bg-base-100 p-3.5 text-custom-lg text-bg ${
                !isLoading && 'hover:bg-base-100/80'
            } ${isDisabled && 'opacity-50'} ${className}`}
            disabled={isDisabled || isLoading}
            onClick={handleClick}
            {...restProps}
        >
            {isLoading ? (
                <Image
                    src="/img/loaderBlack.png"
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

export default BinanceButton
