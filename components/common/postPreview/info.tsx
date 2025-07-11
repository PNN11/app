import { FC, ReactNode } from 'react'

import moment from 'moment'

interface PostPreviewInfoProps {
    children?: ReactNode
    title: string
    description: string
    createdAt: number | string
}

const PostPreviewInfo: FC<PostPreviewInfoProps> = ({ children, createdAt, description, title }) => {
    return (
        <div className="flex grow flex-col justify-between rounded-b-xl bg-base-700 px-4 pt-2 pb-4 transition-all duration-300 group-hover:bg-base-600 sm:px-4 sm:pb-4 sm:pt-2">
            <div>
                <div className="truncate-text mb-1 max-h-14 text-xl font-semibold">{title}</div>
                <div className="truncate-text mb-1.5 max-h-10.5 text-base leading-5 text-base-200">
                    {description}
                </div>
            </div>
            <div className="text-sm leading-6 text-base-300">
                {moment(createdAt).format('MMMM DD, YYYY')}
            </div>
            {children}
        </div>
    )
}

export default PostPreviewInfo
