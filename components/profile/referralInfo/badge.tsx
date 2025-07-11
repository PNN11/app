import { FC } from 'react'

type Props = { title: string; className?: string }

const Badge: FC<Props> = ({ title, className }) => {
    return (
        <div
            className={`flex items-center justify-center rounded-7.5 bg-cta px-2 py-0.5 text-xs ${className}`}
        >
            {title}
        </div>
    )
}

export default Badge
