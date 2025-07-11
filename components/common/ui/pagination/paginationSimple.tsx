import { FC } from 'react'

import PaginationButton from './paginationButton'

import { PaginationArrow } from 'components/svg/paginationArrow'

type PropsType = {
    page: number
    setPage: (page: number) => void
    maxPage: number
}
const PaginationSimple: FC<PropsType> = ({ page, setPage, maxPage }) => {
    return (
        <div className="flex items-center">
            <PaginationButton
                onClick={() => setPage(page - 1)}
                disabled={page === 0 || !page}
                className="rotate-90 disabled:opacity-30"
            >
                <PaginationArrow />
            </PaginationButton>
            <div className="mx-2">Page {page + 1}</div>
            <PaginationButton
                disabled={page === maxPage - 1}
                onClick={() => setPage(page + 1)}
                className="-rotate-90 disabled:opacity-30"
            >
                <PaginationArrow />
            </PaginationButton>
        </div>
    )
}

export default PaginationSimple
