import { FC, useEffect, useState } from 'react'

import PaginationButton from 'components/common/ui/pagination/paginationButton'
import { PaginationArrow } from 'components/svg/paginationArrow'

type PropsType = {
    page: number
    setPage: (page: number) => void
    maxPage: number
    className?: string
}

const Pagination: FC<PropsType> = ({ page, setPage, maxPage, className = '' }) => {
    const [postPerPage] = useState(10)

    const numOfPages = maxPage

    const numOfButtons: number[] = []

    for (let i = 1; i <= numOfPages; i += 1) {
        numOfButtons.push(i)
    }

    const [arrOfCurrButtons, setArrOfCurrButtons] = useState<any[]>([])

    useEffect(() => {
        const currentPage = page + 1
        let tempNumberOfButtons = [...arrOfCurrButtons]

        const dotsInitial = '...'
        const dotsLeft = '... '
        const dotsRight = ' ...'

        if (numOfButtons.length < 6) {
            tempNumberOfButtons = numOfButtons
        } else if (currentPage >= 1 && currentPage <= 3) {
            tempNumberOfButtons = [1, 2, 3, 4, dotsInitial, numOfButtons.length]
        } else if (currentPage === 4 && maxPage > 6) {
            const sliced = numOfButtons.slice(0, 5)

            tempNumberOfButtons = [...sliced, dotsInitial, numOfButtons.length]
        } else if (currentPage === 4 && maxPage === 6) {
            // from 5 to 8 -> (10 - 2)
            const sliced1 = numOfButtons.slice(currentPage - 2, currentPage)
            // sliced1 (5-2, 5) -> [4,5]
            const sliced2 = numOfButtons.slice(currentPage, currentPage + 1)

            // sliced1 (5, 5+1) -> [6]
            tempNumberOfButtons = [1, dotsLeft, ...sliced1, ...sliced2, numOfButtons.length]
            // [1, '...', 4, 5, 6, '...', 10]
        } else if (currentPage > 4 && currentPage < numOfButtons.length - 2) {
            // from 5 to 8 -> (10 - 2)
            const sliced1 = numOfButtons.slice(currentPage - 2, currentPage)
            // sliced1 (5-2, 5) -> [4,5]
            const sliced2 = numOfButtons.slice(currentPage, currentPage + 1)

            // sliced1 (5, 5+1) -> [6]
            tempNumberOfButtons = [
                1,
                dotsLeft,
                ...sliced1,
                ...sliced2,
                dotsRight,
                numOfButtons.length,
            ]
            // [1, '...', 4, 5, 6, '...', 10]
        } else if (currentPage > numOfButtons.length - 3) {
            // > 7
            const sliced = numOfButtons.slice(numOfButtons.length - 4)

            // slice(10-4)
            tempNumberOfButtons = [1, dotsLeft, ...sliced]
        } else if (currentPage === +dotsInitial) {
            // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3
            // arrOfCurrButtons[3] = 4 + 1 = 5
            // or
            // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
            // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
            setPage(arrOfCurrButtons[arrOfCurrButtons.length - 3])
        } else if (currentPage === +dotsRight) {
            setPage(arrOfCurrButtons[3] + 1)
        } else if (currentPage === +dotsLeft) {
            setPage(arrOfCurrButtons[3] - 3)
        }

        setArrOfCurrButtons(tempNumberOfButtons)
    }, [page, postPerPage, numOfPages, maxPage])

    return maxPage > 1 ? (
        <div className={`flex items-center gap-2 ${className}`}>
            <PaginationButton
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === Math.max(0, page - 1) || (!maxPage && !page)}
                className="rotate-90 disabled:opacity-30"
                aria-label="Previous page"
            >
                <PaginationArrow />
            </PaginationButton>
            {arrOfCurrButtons.map(data => {
                return (
                    <PaginationButton
                        onClick={() => setPage(data - 1)}
                        key={data}
                        disabled={data === '...'}
                        className={`flex min-w-[1.5rem] items-center justify-center rounded py-1 px-2 text-custom-sl ${
                            data === page + 1 ? 'bg-cta' : ''
                        }`}
                    >
                        {data}
                    </PaginationButton>
                )
            })}
            <PaginationButton
                disabled={page === Math.min(maxPage - 1, page + 1) || (!maxPage && !page)}
                onClick={() => setPage(Math.min(maxPage - 1, page + 1))}
                className="-rotate-90 disabled:opacity-30"
                aria-label="Next page"
            >
                <PaginationArrow />
            </PaginationButton>
        </div>
    ) : null
}

export default Pagination
