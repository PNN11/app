import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

type DefaultButtonPropsType = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

type ButtonProps = DefaultButtonPropsType & {
    variant?: 'contained' | 'outlined'
    size?: 'xs' | 'small' | 'medium' | 'large'
    login?: boolean
}

const Button: FC<ButtonProps> = ({
    variant = 'contained',
    size,
    login,
    className,
    children,
    ...restProps
}) => {
    return (
        <button
            type="button"
            className={`rounded-button text-center align-middle text-lg text-base-100 transition-all duration-[400ms] 
            ${size === 'xs' ? 'w-37.5' : ''} 
            ${size === 'small' ? 'w-44' : ''} 
            ${size === 'medium' ? 'w-48' : ''} 
            ${size === 'large' ? 'w-72' : ''}
            ${login ? 'h-10 lg:h-14' : 'h-12.5 md:h-15'} 
            ${
                variant === 'contained'
                    ? 'shadow-buttonShadow bg-pink-brightly hover:bg-pink-fuchsia'
                    : ''
            }
            ${
                variant === 'outlined'
                    ? 'border border-solid border-base-100 hover:border-pink-brightly hover:bg-pink-brightly'
                    : ''
            } ${className}`}
            {...restProps}
        >
            {children}
        </button>
    )
}

export default Button
