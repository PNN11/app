import { FC, useState } from 'react'

import Image, { ImageProps } from 'next/image'

import Skeleton from 'components/common/skeleton'

interface Props extends ImageProps {
    classes?: { skeleton?: string }
}

const ImageWithSkeletonLoading: FC<Props> = ({ classes = {}, ...props }) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className="relative">
            <Skeleton
                isLoading={isLoading}
                classes={{ skeleton: `!absolute inset-0 rounded-t-xl ${classes?.skeleton ?? ''}` }}
            >
                <div />
            </Skeleton>
            <Image {...props} onError={() => {}} onLoadingComplete={() => setIsLoading(false)} />
        </div>
    )
}

export default ImageWithSkeletonLoading
