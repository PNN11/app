import { FC, useMemo, useState } from 'react'

import moment from 'moment'
import { useQuery } from 'react-query'

import GameChart from './gameChart'

import { Game } from 'common-types/game'
import BlockTitle from 'components/common/ui/title/blockTitle'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import useServiceStore from 'store/service'
import { priceHistoryOptions } from 'utils/constants/priceHistoryOptions'

const formatNumberToCurrency = (value: number, currency: string): string => {
    const formater = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })

    return `${(currency ?? 'USD').slice(0, 3)} ${formater.format(value)}`
}

interface GameChartsProps {
    game: Game.IGame
}

const GameCharts: FC<GameChartsProps> = ({ game }) => {
    const [playersTimeOpton, setPlayersTimeOpton] = useState(priceHistoryOptions[0])
    const [performanceTimeOption, setPerformanceTimeOption] = useState(priceHistoryOptions[0])

    const playersRequestDate = useMemo(
        () => ({ gte: playersTimeOpton.timestamp, lte: moment().format('MM-DD-YYYY') }),
        [playersTimeOpton]
    )

    const performanceRequestDate = useMemo(
        () => ({ gte: performanceTimeOption.timestamp, lte: moment().format('MM-DD-YYYY') }),
        [performanceTimeOption]
    )

    const gameService = useServiceStore(store => store.gameService)

    const { data: earnedPerformance, isLoading: isEarnedLoading } = useQuery(
        ['get-earned', game?.id, performanceTimeOption],
        () => gameService.getTotalEarned({ gameId: game?.id, date: performanceRequestDate }),
        { enabled: !!game?.id }
    )

    const { data: spentPerformance, isLoading: isSpentLoading } = useQuery(
        ['get-spent', game?.id, performanceTimeOption],
        () => gameService.getTotalSpent({ gameId: game?.id, date: performanceRequestDate }),
        { enabled: !!game?.id }
    )

    const { data: activePlayers, isLoading: isActiveLoading } = useQuery(
        ['get-active-players', game?.id, playersTimeOpton],
        () => gameService.getTotalPlayers({ gameId: game?.id, date: playersRequestDate }),
        { enabled: !!game?.id }
    )

    const { data: newPlayers, isLoading: isNewLoading } = useQuery(
        ['get-new-players', game?.id, playersTimeOpton],
        () => gameService.getNewPlayers({ gameId: game?.id, date: playersRequestDate }),
        { enabled: !!game?.id }
    )

    const playersData = useMemo(
        () => [
            ...(newPlayers?.result?.map((item, index) => ({
                date: item.date,
                new: item.count,
                active: activePlayers?.result[index].count,
            })) ?? []),
        ],
        [activePlayers, newPlayers]
    )

    const performanceData = useMemo(
        () => [
            ...(spentPerformance?.result?.map((item, index) => ({
                date: item.date,
                spent: item.amount,
                earned: earnedPerformance?.result[index]?.amount,
            })) ?? []),
        ],
        [earnedPerformance, spentPerformance]
    )

    return (
        <BlockWrapper>
            <>
                <BlockTitle>Total results</BlockTitle>
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <GameChart
                        data={playersData}
                        isLoading={isActiveLoading || isNewLoading}
                        items={[
                            {
                                key: 'active',
                                title: 'Active users',
                                totalValue: activePlayers?.totalCount,
                                color: '#FF5385',
                            },
                            {
                                key: 'new',
                                title: 'New Players',
                                totalValue: newPlayers?.totalCount,
                                color: '#0285C4',
                            },
                        ]}
                        setTimeOption={setPlayersTimeOpton}
                        timeOption={playersTimeOpton}
                        title="Players"
                    />
                    <GameChart
                        data={performanceData}
                        isLoading={isEarnedLoading || isSpentLoading}
                        items={[
                            {
                                key: 'earned',
                                title: 'Total earned',
                                totalValue: formatNumberToCurrency(
                                    earnedPerformance?.totalEarned,
                                    game?.currencies[0]?.symbol
                                ),
                                color: '#FF5385',
                            },
                            {
                                key: 'spent',
                                title: 'Total spent',
                                totalValue: formatNumberToCurrency(
                                    spentPerformance?.totalSpent,
                                    game?.currencies[0]?.symbol
                                ),
                                color: '#0285C4',
                            },
                        ]}
                        setTimeOption={setPerformanceTimeOption}
                        timeOption={performanceTimeOption}
                        title="Performance"
                        yAxisTickFormatter={value =>
                            formatNumberToCurrency(value, game?.currencies[0]?.symbol)
                        }
                    />
                </div>
            </>
        </BlockWrapper>
    )
}

export default GameCharts
