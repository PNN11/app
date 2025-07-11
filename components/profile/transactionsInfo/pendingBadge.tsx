import { FC } from 'react'

import Badge from '../referralInfo/badge'

interface Props {
    onClick?: () => void
}

const PendingBadge: FC<Props> = ({ onClick }) => {
    return (
        <button type="button" onClick={onClick}>
            <Badge title="Pending" className="irounded-7.5 w-max bg-warning" />
        </button>
    )
}

export default PendingBadge
