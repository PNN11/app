import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

type PropsType = {
    icon: string
    title: string
    gameId: string
    classes?: { wrapper?: string; title?: string }
}

const GameBadge: FC<PropsType> = ({
    icon,
    title,
    gameId,
    classes = { title: '', wrapper: '' },
}) => {
    return (
        <Link
            href={`/games/${gameId}`}
            className={`flex cursor-pointer items-center gap-[0.3125rem] rounded-full bg-opacity-50
             px-2 py-1 outline-none backdrop-blur-[0.3125rem] hover:bg-opacity-100 focus:shadow-active ${classes.wrapper}`}
        >
            {icon && <Image src={icon} width={14} height={18} alt={`${title} logo`} />}
            <div className={`text-custom-sl ${classes.title}`}>{title}</div>
        </Link>
    )
}

export default GameBadge
