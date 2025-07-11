import { FC } from 'react'

import Pagination from 'components/common/ui/pagination/Pagination'

type PaginationBlockPropsType = {
    className?: string
    totalCount: number
    page: number
    setPage: (page: number) => void
    pageSize: number
    count: number
    isLoading: boolean
}

export const PaginationBlock: FC<PaginationBlockPropsType> = ({
    className,
    totalCount,
    page,
    pageSize,
    setPage,
    count,
    isLoading,
}) => {
    const maxPage = Math.ceil(totalCount / pageSize)

    return (
        <div
            className={`${className} flex w-full flex-col-reverse items-center gap-3 s:flex-row s:justify-between`}
        >
            {!isLoading && totalCount ? (
                <div>
                    Showing {totalCount ? pageSize * page + 1 : 0} to{' '}
                    {count >= pageSize ? pageSize * page + pageSize : totalCount} of {totalCount}
                </div>
            ) : null}
            <Pagination maxPage={maxPage} page={page} setPage={setPage} />
        </div>
    )
}
