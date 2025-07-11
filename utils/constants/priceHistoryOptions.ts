import moment from 'moment'

export type PriceHistoryOption = {
    label: string
    value: string
    timestamp: string
}

const last90DayTimestamp = moment(Date.now()).subtract(89, 'day').format('MM-DD-YYYY')
const last60DayTimestamp = moment(Date.now()).subtract(59, 'day').format('MM-DD-YYYY')
const last30DayTimestamp = moment(Date.now()).subtract(29, 'day').format('MM-DD-YYYY')
const last7DayTimestamp = moment(Date.now()).subtract(6, 'day').format('MM-DD-YYYY')

export const priceHistoryOptions: PriceHistoryOption[] = [
    { label: 'Last 90 days', value: '90 day', timestamp: last90DayTimestamp },
    { label: 'Last 60 days', value: '60 day', timestamp: last60DayTimestamp },
    { label: 'Last 30 days', value: '30 day', timestamp: last30DayTimestamp },
    { label: 'Last 7 days', value: '7 day', timestamp: last7DayTimestamp },
]
