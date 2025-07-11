import React from 'react'

interface TableHeaderProps {
    titles: string[]
}

const TableHeader = React.forwardRef<HTMLDivElement, TableHeaderProps>(({ titles }, ref) => {
    return (
        <div
            ref={ref}
            className="grid-cols-minmax grid w-full gap-x-4 border-b border-b-white/10 py-3 px-5 text-sm"
        >
            {titles.map((title, index) => (
                <p key={`tableHeaderTitles${title}${+index}`} className="col-span-1 opacity-70">
                    {title}
                </p>
            ))}
        </div>
    )
})

export default TableHeader
