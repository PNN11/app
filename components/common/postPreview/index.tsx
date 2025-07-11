import { FC } from 'react'

import Image from 'next/image'
import { LinkProps } from 'next/link'

import PostPreviewInfo from './info'
import PostPreviewWrapper from './wrapper'

import { News } from 'utils/types/TextContentType'

interface NewsCardProps {
    news: News
    link: LinkProps['href']
}
const NewsCard: FC<NewsCardProps> = ({ news: { createdAt, description, image, title }, link }) => {
    return (
        <PostPreviewWrapper href={link}>
            <Image
                src={image}
                width={316}
                height={200}
                alt={title}
                className="aspect-video w-full rounded-t-xl object-cover"
            />
            <PostPreviewInfo createdAt={createdAt} description={description} title={title} />
        </PostPreviewWrapper>
    )
}

export default NewsCard
