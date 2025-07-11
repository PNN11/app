import { FC } from 'react'

import Image from 'next/image'

import SmallButton from '../ui/buttons/newSmallButton'

import PostPreviewInfo from './info'
import PostPreviewWrapper from './wrapper'

import { TMainPost } from 'components/postElements/postElements-types'
import { getLinkToPost } from 'utils/getLinkToPost'

interface MainPostPreviewProps {
    postData: TMainPost
}

const MainPostPreview: FC<MainPostPreviewProps> = ({
    postData: {
        article: { title, description, createdAt, address, category },
        banner,
    },
}) => {
    return (
        <PostPreviewWrapper href={getLinkToPost(address, category)}>
            <Image
                src={banner.url}
                width={1312}
                height={368}
                alt={title}
                className="max-h-92 w-full rounded-t-xl border-x border-t border-base-700 object-cover"
            />
            <div className="rounded-b-xl border-x border-b border-base-700">
                <PostPreviewInfo title={title} createdAt={createdAt} description={description}>
                    <SmallButton className="mt-5 w-fit" variant="outlined">
                        Read more
                    </SmallButton>
                </PostPreviewInfo>
            </div>
        </PostPreviewWrapper>
    )
}

export default MainPostPreview
