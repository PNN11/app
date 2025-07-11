import { FC } from 'react'

import GameStat, { GameStatProps } from 'components/game/basicInfo/stats/base'
import { useHydrated } from 'hooks/useHydrated'

interface Props {
    classes?: { stat?: GameStatProps['classes']; wrapper?: string }
    isLoading: boolean
    myNftCount: number
    stakedNftCount: number
    raffleSpins: number
    raffleMultiplier: number
    referralMultiplier: number
}

const CollectionStats: FC<Props> = ({
    classes,
    isLoading,
    myNftCount,
    raffleSpins,
    stakedNftCount,
    raffleMultiplier,
    referralMultiplier,
}) => {
    const isHydrated = useHydrated()

    return (
        <div className={`flex items-center gap-4 md:gap-7 ${classes.wrapper ?? ''}`}>
            {isHydrated && (
                <>
                    <GameStat
                        isLoading={isLoading}
                        title="My NFTs"
                        value={myNftCount}
                        classes={classes?.stat}
                    />
                    <GameStat
                        isLoading={isLoading}
                        title="Staked NFTs"
                        value={stakedNftCount}
                        classes={classes?.stat}
                    />
                    <GameStat
                        isLoading={isLoading}
                        title="Referral multiplier"
                        value={referralMultiplier}
                        classes={classes?.stat}
                    />
                    <GameStat
                        isLoading={isLoading}
                        title="Reward multiplier"
                        value={raffleMultiplier}
                        classes={classes?.stat}
                    />
                    <GameStat
                        isLoading={isLoading}
                        title="Spins in the Raffle"
                        value={raffleSpins}
                        classes={classes?.stat}
                    />
                </>
            )}
        </div>
    )
}

export default CollectionStats
