import { FC, ReactNode } from 'react'

interface PostContentWrapperProps {
    className?: string
    children: ReactNode
}

const PostContentWrapper: FC<PostContentWrapperProps> = ({ children, className = '' }) => {
    return <div className={`max-w-244.5 ${className}`}>{children}</div>
}

export default PostContentWrapper
