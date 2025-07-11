import { FC } from 'react'

interface Props {
    children: any
    isLoading: boolean
    count?: number
    classes?: { wrapper?: string; skeleton?: string }
}

const Skeleton: FC<Props> = ({ children, isLoading, count = 1, classes = {} }) => {
    if (!isLoading) return children

    if (count > 1) {
        return (
            <div className={`${classes?.wrapper ?? ''} w-full`}>
                {Array(count)
                    .fill(undefined)
                    .map((item, index) => (
                        <div
                            key={+index}
                            className={`skeleton-loading w-full ${classes.skeleton ?? ''}`}
                        />
                    ))}
            </div>
        )
    }

    return <span className={`skeleton-loading w-full ${classes.skeleton ?? ''}`} />
}

export default Skeleton
