import { FC } from 'react'

const tableHeaderTitles = ['# Username', 'Score']

const TableHeader: FC = () => {
    return (
        <div className="flex justify-between gap-x-4 py-3 px-10 text-sm">
            {tableHeaderTitles.map((title, index) => (
                <p key={`tableHeaderTitles${+index}`} className="w-full opacity-70">
                    {title}
                </p>
            ))}
        </div>
    )
}

export default TableHeader
