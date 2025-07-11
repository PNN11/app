import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

type DefaultButtonPropsType = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>
type PropsType = DefaultButtonPropsType & {}
const ActivityButton: FC<PropsType> = ({ children, className, ...props }) => {
    return (
        <button
            type="button"
            className={`${className} box-border rounded-xl px-6 py-1 shadow-activity-button hover:bg-cta-600 focus:shadow-active focus:outline-none active:bg-cta`}
            {...props}
        >
            {children}
        </button>
    )
}

export default ActivityButton
