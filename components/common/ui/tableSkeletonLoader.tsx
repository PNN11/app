import { FC } from 'react'

interface TableSkeletonLoaderProps {
    isLoading: boolean
    rowsCount: number
    columnsCount: number
    classes?: { row?: string; column?: string }
}

const TableSkeletonLoader: FC<TableSkeletonLoaderProps> = ({
    columnsCount,
    isLoading,
    rowsCount,
    classes = { column: '', row: '' },
}) => {
    return isLoading ? (
        <>
            {Array(rowsCount)
                .fill(undefined)
                .map((item, index) => (
                    <div
                        style={{ gridTemplateColumns: `repeat(${columnsCount},minmax(0,1fr))` }}
                        className={`grid gap-4 py-2 px-5 text-base ${classes.row}`}
                        key={+index}
                    >
                        {Array(columnsCount)
                            .fill(undefined)
                            .map((item, index) => (
                                <p
                                    key={+index}
                                    className={`skeleton-loading w-full ${classes.column}`}
                                />
                            ))}
                    </div>
                ))}
        </>
    ) : null
}

export default TableSkeletonLoader
