import { FC } from 'react'

import GameStats from '../basicInfo/gameStats'

import GameInfo from './info'
import Screenshots from './screenshots'

import { Game } from 'common-types/game'
import BlockTitle from 'components/common/ui/title/blockTitle'
import { BlockWrapper } from 'components/common/wrappers/blockWrapper'
import useCollectionQuery from 'hooks/useCollectionQuery'

interface Props {
    className?: string
    game: Game.IGame
}

const GameOverview: FC<Props> = ({ className = '', game }) => {
    const { data: collection, isLoading: statsIsLoading } = useCollectionQuery(
        game.collections?.[0]?._id
    )

    const isScreenshotsExists = !!game?.screenshots?.length

    return (
        <BlockWrapper className={className}>
            <>
                <BlockTitle>Overview</BlockTitle>
                <div className="gap-y-8 xl:grid xl:grid-cols-12 xl:gap-x-4">
                    {isScreenshotsExists && (
                        <div className="mb-5 xl:col-span-9 xl:mb-0">
                            <Screenshots screenshots={game?.screenshots} />
                        </div>
                    )}
                    <div className={`xl:col-span-9 ${isScreenshotsExists ? 'order-2' : ''}`}>
                        <div>{game?.description}</div>
                        {collection?.statistics?.countTokens ? (
                            <GameStats
                                currency={collection?.currencies?.[0]}
                                statistics={collection?.statistics}
                                isLoading={statsIsLoading}
                                classes={{
                                    stat: {
                                        wrapper: '!bg-transparent !px-0',
                                        value: '!justify-start',
                                        title: '!text-start',
                                    },
                                    wrapper:
                                        '!flex justify-between sm:justify-start sm:gap-9 md:gap-0 lg:!gap-9',
                                }}
                            />
                        ) : null}
                    </div>
                    <div className="xl:col-span-3">
                        <GameInfo gameInfo={game} className="h-full" />
                    </div>
                </div>
            </>
        </BlockWrapper>
    )
}

export default GameOverview
