/* eslint-disable react/no-array-index-key */
import { FC } from 'react'

import { useRouter } from 'next/router'

import { FilterPreview } from 'components/common/filter-query/types'
import { applySelector, clearFilterQueryParams } from 'components/common/filter-query/utitls'
import RemoveSvg from 'components/svg/removeSvg'
import useFilterStore from 'store/useFilterStore'

interface FilterBadgesProps {
    previews: FilterPreview<any, any>[]
}

const getResets = (value: any, depth = 0): Function[] => {
    if (depth > 3) throw new Error('Exceeded max recursive depth for filters')
    // check if its a function return value
    if (typeof value === 'function') return [value]

    // if an object recursivly call getResets
    return Object.entries(value)
        .map(([, _value]) => getResets(_value, depth + 1))
        .flat()
}

const getObjForClearFilters = (filters: any): any => {
    const entries = Object.entries(filters).map(([key, value]) => {
        let _value

        if (Array.isArray(value)) {
            _value = []
        }
        if (typeof value === 'object' && !Array.isArray(value)) {
            if (Object.keys(value).length) {
                _value = getObjForClearFilters(value)
            } else {
                _value = {}
            }
        }

        return [key, _value]
    })

    const obj = Object.fromEntries(entries)

    return obj
}

const FilterBadges: FC<FilterBadgesProps> = ({ previews }) => {
    const _filters = useFilterStore(s => s.filter)
    const set = useFilterStore(s => s.setFilter)
    const _resets = useFilterStore(s => s.resets)
    const router = useRouter()

    const components = previews
        .map((filter, index) => {
            const value = applySelector(filter.selector, _filters)

            if (value === null || value === undefined || value === '') return null

            if (Array.isArray(value)) {
                if (!value.length) return null

                return value.map((element, index) => {
                    const onClick = (): void => {
                        const resets = getResets(applySelector(filter.selector, _resets, []))

                        resets?.[0]?.(value, element)
                    }

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-1 rounded-full bg-base-700 px-3 py-1"
                        >
                            <filter.Component value={element} />
                            <div onClick={onClick} className="hover:cursor-pointer">
                                <RemoveSvg />
                            </div>
                        </div>
                    )
                })
            }

            const onClick = (): void => {
                const resets = getResets(applySelector(filter.selector, _resets, []))

                resets.forEach(func => {
                    func?.()
                })
            }

            return (
                <div
                    key={index}
                    className="flex items-center gap-1 rounded-full bg-base-700 px-3 py-1"
                >
                    <div>
                        <filter.Component value={value} />
                    </div>
                    <div onClick={onClick} className="hover:cursor-pointer">
                        <RemoveSvg />
                    </div>
                </div>
            )
        })
        .filter(item => item !== null)

    return (
        <>
            {components.map(item => item)}
            {components.length > 0 ? (
                <div
                    onClick={async () => {
                        const obj = getObjForClearFilters(_filters)

                        set(obj)
                        clearFilterQueryParams(router)
                    }}
                    className="flex cursor-pointer items-center px-3 py-1 text-sm text-link"
                >
                    <div>Clear all</div>
                </div>
            ) : null}
        </>
    )
}

export default FilterBadges
