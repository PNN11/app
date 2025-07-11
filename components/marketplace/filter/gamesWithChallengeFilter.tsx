import { FC } from 'react'

import FilterWrapper from './filterWrapper'
import { GamesFilter, TGamesWithChallengesFilter } from './types'

import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import Switch from 'components/common/ui/switch'

const GamesWithChallengeFilter: FC = () => {
    const [gamesWithChallenges, setGamesWithChallenges] = useFilterState<
        Pick<GamesFilter, 'gameWithChallenges'>,
        TGamesWithChallengesFilter
    >(
        store => store.gameWithChallenges,
        value => ({ gameWithChallenges: value })
    )

    const handleChangeStatus = (): void => {
        if (gamesWithChallenges === 'With challenges') {
            setGamesWithChallenges(undefined)

            return
        }

        setGamesWithChallenges('With challenges')
    }

    return (
        <FilterWrapper>
            <Switch
                checked={gamesWithChallenges === 'With challenges'}
                label="Only challenge games"
                onChange={handleChangeStatus}
                name="game-with-challenges"
            />
        </FilterWrapper>
    )
}

export default GamesWithChallengeFilter

export const GamesWithChallengePreview: FilterPreview<
    Pick<GamesFilter, 'gameWithChallenges'>,
    string
> = {
    selector: store => store.gameWithChallenges,
    Component: ({ value }) => <div>{value}</div>,
}
