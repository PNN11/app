import { FC } from 'react'

interface Props {
    link: string
    Icon: FC
}

const GameSocialLink: FC<Props> = ({ Icon, link }) => {
    return (
        <a
            target="_blank"
            rel="noreferrer"
            href={link}
            className="flex h-11 w-42 items-center justify-center rounded-lg bg-base-100/20"
        >
            <Icon />
        </a>
    )
}

export default GameSocialLink
