import { FC } from 'react'

import moment from 'moment'
import Image from 'next/image'

import { TPreviewLink } from './postElements-types'

import IconWithLink from 'components/common/social/icon'
import { ConditionalLink } from 'components/common/ui/conditionalLink'
import FacebookIcon from 'components/svg/facebookIcon'
import LinkedinIcon from 'components/svg/linkedinIcon'
import Telegram from 'components/svg/telegram'
import Twitter from 'components/svg/twitter'
import { useLocation } from 'hooks/useLocation'

interface PostPreviewProps {
    title: string
    description: string
    createdAt: number
    preview: string
    previewAlt?: string
    previewLink?: TPreviewLink
}

const icons = [
    {
        Icon: Twitter,
        link: (url: string) => `${process.env.NEXT_PUBLIC_TWITTER_SHARE_URL}${encodeURI(url)}`,
    },
    {
        Icon: Telegram,
        link: (url: string) => `${process.env.NEXT_PUBLIC_TELEGRAM_SHARE_URL}${encodeURI(url)}`,
    },
    {
        Icon: FacebookIcon,
        link: (url: string) => `${process.env.NEXT_PUBLIC_FACEBOOK_SHARE_URL}${encodeURI(url)}`,
    },
    {
        Icon: LinkedinIcon,
        link: (url: string) => `${process.env.NEXT_PUBLIC_LINKEDIN_SHARE_URL}${encodeURI(url)}`,
    },
]

const PostPreview: FC<PostPreviewProps> = ({
    createdAt,
    description,
    preview,
    title,
    previewAlt,
    previewLink,
}) => {
    const location = useLocation()

    return (
        <div className="mb-12 pt-13">
            <h1 className="mb-1 text-post-h1 font-medium text-base-100">{title}</h1>
            <div className="mb-4 text-xl">{description}</div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-y-4 gap-x-8">
                <div className="text-sm leading-6 text-base-300">
                    {moment(createdAt).format('MMMM DD, YYYY')}
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-lg font-medium leading-5 text-base-300">
                        Share this article:
                    </div>
                    <div className="flex items-center gap-4">
                        {icons.map(({ Icon, link }) => (
                            <IconWithLink
                                classes={{ link: 'bg-base-700' }}
                                Icon={Icon}
                                key={link(location?.href)}
                                link={link(location?.href)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <ConditionalLink
                condition={!!previewLink?.link}
                href={previewLink?.link}
                target={previewLink?.newWindow ? '_blank' : '_self'}
            >
                <Image
                    src={preview}
                    width={1312}
                    height={500}
                    alt={previewAlt ?? title}
                    priority
                    quality={100}
                    className=""
                />
            </ConditionalLink>
        </div>
    )
}

export default PostPreview
