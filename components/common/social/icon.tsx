import { FC } from 'react'

interface IconWithLinkProps {
    link: string
    Icon: FC<{ className?: string }>
    classes?: { link?: string; icon?: string }
}

const IconWithLink: FC<IconWithLinkProps> = ({ Icon, link, classes = { icon: '', link: '' } }) => {
    return (
        <a
            className={`group m-0 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:bg-base-100 ${classes.link}`}
            href={link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Link to ${link}`}
        >
            <Icon
                className={`max-h-7 max-w-[1.375rem] transition-all duration-300 group-hover:text-base-700 ${classes.icon}`}
            />
        </a>
    )
}

export default IconWithLink
