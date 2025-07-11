import { ComponentProps, FC } from 'react'

import { twMerge } from 'tailwind-merge'

interface WalletActionButtonProps extends ComponentProps<'button'> {
    Icon: FC<{ className?: string }>
    iconClassName?: string
    title: string
}

const WalletActionButton: FC<WalletActionButtonProps> = ({
    className = '',
    Icon,
    title,
    iconClassName = '',
    ...props
}) => {
    return (
        <button
            type="button"
            className={twMerge('relative flex flex-col items-center', className)}
            {...props}
        >
            <Icon
                className={twMerge('h-10 w-10 rounded-full p-2 hover:bg-base-600', iconClassName)}
            />
            <span className="text-xs text-base-100/70">{title}</span>
        </button>
    )
}

export default WalletActionButton
