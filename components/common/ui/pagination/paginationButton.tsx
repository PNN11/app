import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

type DefaultButtonPropsType = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

type PropsType = DefaultButtonPropsType

const PaginationButton: FC<PropsType> = ({ children, ...props }) => {
    return (
        <button type="button" {...props}>
            {children}
        </button>
    )
}

export default PaginationButton
