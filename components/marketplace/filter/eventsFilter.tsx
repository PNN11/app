import { FC } from 'react'

import AccordionFilterWrapper from './accordionFilterWrapper'
import { MarketplaceFilter, TEventsFilter } from './types'

import { IMarketplaceUserActivities } from 'common-types/marketplace/marketplace-user-activities'
import { useFilterState } from 'components/common/filter-query/useFilterState'

export type EventType = {
    title: string
    value: IMarketplaceUserActivities.TEvents
    icon: string
}

const events: EventType[] = [
    {
        title: 'Listings',
        value: 'LIST',
        icon: '/img/marketplace/listings.svg',
    },
    {
        title: 'Sales',
        value: 'SALE',
        icon: '/img/marketplace/sales.svg',
    },
    {
        title: 'Transfers',
        value: 'TRANSFER',
        icon: '/img/marketplace/transfers.svg',
    },
    {
        title: 'Minted',
        value: 'MINTED',
        icon: '/img/marketplace/minted.svg',
    },
    {
        title: 'Bids',
        value: 'BID',
        icon: '/img/marketplace/bids.svg',
    },
]

const EventsFilter: FC = () => {
    const [eventsFilter, setEventsFilter] = useFilterState<
        Pick<MarketplaceFilter, 'events'>,
        TEventsFilter
    >(
        store => store.events,
        value => ({ events: value }),
        {
            defaultValue: [],
            remover: (value, current) => value.filter(item => item !== current),
        }
    )

    const handleAddEventToFilter = (event: EventType): void => {
        if (eventsFilter.includes(event.value)) {
            setEventsFilter(eventsFilter.filter(item => item !== event.value))

            return
        }

        setEventsFilter([...(eventsFilter ?? []), event.value])
    }

    return (
        <AccordionFilterWrapper
            items={events}
            itemToKey={item => item.title}
            itemToLabel={item => item.title}
            title="Event Type"
            itemToIcon={item => item.icon}
            isChecked={item => eventsFilter.includes(item.value)}
            onClickItem={handleAddEventToFilter}
        />
    )
}

export default EventsFilter
