import { FC } from 'react'

import moment from 'moment'
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { IMarketplaceCollection } from 'common-types/marketplace/marketplace-collection'

type CustomTooltipProps = Partial<{
    active: boolean
    payload: { value: number; payload: IMarketplaceCollection.PriceHistoryPoint }[]
}>

type CustomTooltipFunc = (params: CustomTooltipProps) => JSX.Element

const CustomTooltip: CustomTooltipFunc = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="translate-y-[-110%] transform pb-2 outline-none">
                <div className="rounded bg-base-650 py-2 px-2.5 text-center content-[''] sm:px-3">
                    <div>{moment(payload[0].payload.date).format('MMMM DD, YYYY')}</div>
                    <div className="opacity-60">Avg. price: Ξ{payload[0].payload.avg}</div>
                    <div className="opacity-60"> Num.sales: {payload[0].payload.countSale}</div>
                </div>
            </div>
        )
    }

    return null
}

interface ChartProps {
    data: IMarketplaceCollection.PriceHistoryPoint[]
}

const isValueNullOrNotSmall = (data: IMarketplaceCollection.PriceHistoryPoint[]): boolean => {
    const maxAvgValue: number = Math.max(...data.map(el => el.avg))

    return maxAvgValue === 0 || maxAvgValue > 0.00001
}

const formatAxisNumber = (el: number): string =>
    new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 5,
        useGrouping: false,
        // @ts-ignore
        roundingMode: 'ceil',
    }).format(el)

const Chart: FC<ChartProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={112} className="text-base-100">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -5, bottom: 5 }}>
                <defs>
                    <linearGradient id="chart-color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FF5385" stopOpacity={1} />
                        <stop offset="95%" stopColor="#FF5385" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid
                    vertical={false}
                    strokeWidth={0.75}
                    strokeOpacity={0.5}
                    stroke="#FFF"
                />
                <XAxis
                    tickMargin={10}
                    axisLine={false}
                    stroke="#FFFFFF"
                    tickLine={{ strokeWidth: 0.75, strokeOpacity: 0.5, stroke: '#FFF' }}
                    dataKey="date"
                    tickFormatter={value => {
                        const date: Date = new Date(value)

                        return `${date.getMonth() + 1}/${date.getDate()}`
                    }}
                    fontSize={12}
                />
                <YAxis
                    tickMargin={0}
                    stroke="#FFFFFF"
                    axisLine={false}
                    tickCount={isValueNullOrNotSmall(data) ? 4 : 2}
                    tickLine={false}
                    fontSize={12}
                    tickFormatter={tick => formatAxisNumber(tick)}
                />
                <Tooltip
                    allowEscapeViewBox={{ y: true }}
                    content={<CustomTooltip />}
                    offset={0}
                    wrapperStyle={{ outline: 'none' }}
                />
                <Area
                    type="monotone"
                    dataKey="avg"
                    stroke="#FF5385"
                    dot={false}
                    strokeWidth={2}
                    fill="url(#chart-color)"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default Chart
