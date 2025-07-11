import { FC } from 'react'

interface IWrapperBlock {
    title: string
    children: JSX.Element
    className?: string
}

const WrapperBlock: FC<IWrapperBlock> = ({ title, children, className }) => {
    return (
        <div className={className}>
            <p className="mb-3 mt-5 text-2xl font-medium md:mt-6">{title}</p>
            {children}
        </div>
    )
}

export default WrapperBlock
