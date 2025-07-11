import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

type DefaultButtonPropsType = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>
type PropsType = DefaultButtonPropsType & {
    variant?: 'primary' | 'secondary' | 'inline'
}
const SmallButton: FC<PropsType> = ({ children, className, variant = 'primary', ...props }) => {
    return (
        <button
            type="button"
            className={`${className} box-border rounded-2xl px-3 py-2 text-custom-sl outline-transparent  focus:outline-none
            ${variant === 'primary' ? 'bg-cta hover:bg-cta-600' : ''}
            ${variant === 'secondary' ? 'bg-base-800 text-base-100 hover:bg-base-700' : ''}
            ${
                variant === 'inline'
                    ? 'min-w-[4.0625rem] border border-base-100 border-opacity-50 text-base-100 hover:border-opacity-100 hover:bg-base-100 hover:bg-opacity-10 focus:border-none'
                    : ''
            }`}
            {...props}
        >
            {children}
        </button>
    )
}

export default SmallButton
