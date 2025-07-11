import { FC } from 'react'

export enum NftStatus {
    ENDED = 'Ended',
    SOLD_OUT = 'Sold out',
    OWNED = 'You own this item',
    YOUR_BID_HIGHTEST = 'Your bid is the hightest',
}
type PropsType = {
    status: NftStatus
    className?: string
}
const NftStatusBadge: FC<PropsType> = ({ status, className }) => {
    return (
        <div
            className={`whitespace-nowrap rounded-2xl border border-base-300 px-5 py-2 text-center text-sm font-medium leading-6 text-base-300 ${className}`}
        >
            {status}
        </div>
    )
}

export default NftStatusBadge
