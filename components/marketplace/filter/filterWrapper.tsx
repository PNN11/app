import { FC, ReactNode } from 'react'

interface FilterWrapperProps {
    className?: string
    children: ReactNode
}

const FilterWrapper: FC<FilterWrapperProps> = ({ children, className }) => {
    return <div className={`flex flex-col gap-2 py-3 ${className}`}>{children}</div>
}

export default FilterWrapper
