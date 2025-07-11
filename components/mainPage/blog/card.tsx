import { FC } from 'react'

import moment from 'moment'
import Image from 'next/image'
import { LinkProps } from 'next/link'

import PostPreviewWrapper from 'components/common/postPreview/wrapper'
import MainPageSocialArrow from 'components/svg/mainPage/arrow'
import { News } from 'utils/types/TextContentType'

interface MainPageBlogCardProps {
    news: News
    link: LinkProps['href']
}
const MainPageBlogCard: FC<MainPageBlogCardProps> = ({
    news: { createdAt, image, title },
    link,
}) => {
    return (
        <PostPreviewWrapper href={link}>
            <Image
                src={image}
                width={316}
                height={200}
                alt={title}
                className="aspect-video w-full rounded-2xl object-cover"
            />
            <div className="flex grow flex-col justify-between rounded-b-xl pt-4 pb-4 transition-all duration-300">
                <div className="grid grid-cols-[1fr_1.5rem] justify-between gap-4">
                    <div className="truncate-three-rows mb-5 max-h-18 text-xl font-semibold leading-6">
                        {title}
                    </div>
                    <MainPageSocialArrow />
                </div>
                <div className="text-sm leading-6 text-base-300">
                    {moment(createdAt).format('MMMM DD, YYYY')}
                </div>
            </div>
        </PostPreviewWrapper>
    )
}

export default MainPageBlogCard
