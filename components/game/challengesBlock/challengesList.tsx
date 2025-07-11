import { FC } from 'react'

import { Game } from 'common-types/game'
import NewsCard from 'components/common/postPreview'

interface ChallengesListProps {
    isLoading: boolean
    list: Game.Challenge[]
    gameAddress: string
}

const ChallengesList: FC<ChallengesListProps> = ({ isLoading, list, gameAddress }) => {
    return (
        !isLoading &&
        list && (
            <>
                {list.map(({ createdAt, id, title, description, preview, isVisible }) => {
                    return (
                        isVisible && (
                            <NewsCard
                                key={title}
                                link={`/games/${gameAddress}/challenges/${id}`}
                                news={{
                                    createdAt: new Date(createdAt)?.valueOf(),
                                    description,
                                    id,
                                    image: preview.url,
                                    title,
                                }}
                            />
                        )
                    )
                })}
            </>
        )
    )
}

export default ChallengesList
