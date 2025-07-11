import { FC, ReactNode } from 'react'

interface GameInfoItemProps {
    title: string
    children: ReactNode
}

const GameInfoItem: FC<GameInfoItemProps> = ({ children, title }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="text-base-200">{title}:</div>
            <div>{children}</div>
        </div>
    )
}

export default GameInfoItem
