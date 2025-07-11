import { FC, useEffect } from 'react'

import FilterWrapper from './filterWrapper'
import { GamesFilter, TGameStatusFilter } from './types'

import { FilterPreview } from 'components/common/filter-query/types'
import { useFilterState } from 'components/common/filter-query/useFilterState'
import Switch from 'components/common/ui/switch'

const GameStatusFilter: FC = () => {
    const [gameStatus, setGameStatus] = useFilterState<
        Pick<GamesFilter, 'gameStatus'>,
        TGameStatusFilter
    >(
        store => store.gameStatus,
        value => ({ gameStatus: value })
    )

    const handleChangeStatus = (): void => {
        if (gameStatus === 'LIVE') {
            setGameStatus(undefined)

            return
        }

        setGameStatus('LIVE')
    }

    useEffect(() => {}, [])

    return (
        <FilterWrapper>
            <Switch
                checked={gameStatus === 'LIVE'}
                label="Only live games"
                onChange={handleChangeStatus}
            />
        </FilterWrapper>
    )
}

export default GameStatusFilter

export const GameStatusPreview: FilterPreview<Pick<GamesFilter, 'gameStatus'>, string> = {
    selector: store => store.gameStatus,
    Component: ({ value }) => <div className="capitalize">{value.toLowerCase()}</div>,
}
