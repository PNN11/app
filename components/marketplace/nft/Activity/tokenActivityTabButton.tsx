import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name: string
    children: ReactNode
    active: boolean
}

const TokenActivityTabButton: FC<TabButtonProps> = ({ name, children, active, ...props }) => {
    return (
        <button
            type="button"
            name={name}
            className={`group flex cursor-pointer items-center gap-2 rounded-2xl py-2 px-3 text-sm text-base-300 hover:text-base-100 ${
                active ? 'bg-base-700 text-base-100' : ''
            }`}
            {...props}
        >
            {children}
        </button>
    )
}

export default TokenActivityTabButton
