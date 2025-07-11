import { FC } from 'react'

import Link from 'next/link'

import { WheelDescriptionProps } from './types'

const WheelDescription: FC<WheelDescriptionProps> = ({ availableSpins, hasPrivileges }) => {
    if (availableSpins === 0) return null

    if (!hasPrivileges)
        return (
            <>
                <div className="text-center">
                    You have {availableSpins} available spin{availableSpins > 1 ? 's' : ''}
                </div>
                <div>
                    You don`t have additional spins. To do more spins{' '}
                    <Link className="font-bold text-cta underline" href="/staking">
                        stake NFT
                    </Link>{' '}
                </div>
            </>
        )

    return <>You have {availableSpins} spins for today, because you staked 1 NFT</>
}

export default WheelDescription
