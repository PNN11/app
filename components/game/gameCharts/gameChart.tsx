import { Dispatch, SetStateAction } from 'react'

import moment from 'moment'
import { ValueOf } from 'next/dist/shared/lib/constants'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import ChartItemInfo from './chartItemInfo'

import { Dropdown } from 'components/common/ui/dropdown'
import Loader from 'components/svg/loader'
import { PriceHistoryOption, priceHistoryOptions } from 'utils/constants/priceHistoryOptions'
import { FlattenFields } from 'utils/types/helpers'

type ChartItem<T> = {
    key: FlattenFields<T>
    title: string
    totalValue: number | string
    color: string
}

interface GameChartProps<T> {
    data: T[]
    items: ChartItem<T>[]
    yAxisTickFormatter?: (value: ValueOf<T>) => string
    title: string
    timeOption: PriceHistoryOption
    setTimeOption: Dispatch<SetStateAction<PriceHistoryOption>>
    isLoading?: boolean
}

type GameChartType = <T = unknown>(props: GameChartProps<T>) => JSX.Element

const Label = ({ label }: { label: string }): JSX.Element => {
    return <span>{label}</span>
}

const GameChart: GameChartType = ({
    title,
    data,
    setTimeOption,
    timeOption,
    yAxisTickFormatter,
    items,
    isLoading,
}) => {
    return (
        <div className="rounded-2xl bg-base-700 p-5">
            <div className="mb-4 text-xl font-medium">{title}</div>
            <div className="mb-5 flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
                <div className="flex flex-wrap items-center gap-7">
                    {items.map(({ color, key, title, totalValue }) => (
                        <ChartItemInfo
                            isLoading={isLoading}
                            key={key}
                            title={title}
                            value={totalValue}
                            color={color}
                        />
                    ))}
                </div>
                <Dropdown
                    items={priceHistoryOptions}
                    activeItem={timeOption}
                    setActiveItem={setTimeOption}
                    elementToLabel={Label}
                    className="bg-base-600 group-hover:bg-base-650"
                    classes={{
                        activeItem: 'bg-base-600 group-hover:bg-base-650',
                        item: 'bg-base-650 hover:bg-base-600',
                        wrapper: 'group w-full sm:w-fit',
                    }}
                />
            </div>
            <div className="relative">
                {isLoading ? (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 stroke-white">
                        <Loader color="" />
                    </div>
                ) : null}
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minHeight={109}
                    className="text-base-100"
                >
                    <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <defs>
                            {items.map(({ color, key }) => (
                                <linearGradient key={key} id={key} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={1} />
                                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                                </linearGradient>
                            ))}
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
                            tickFormatter={value => moment(value).format('M/D')}
                            fontSize={12}
                        />
                        <YAxis
                            tickMargin={12}
                            stroke="#FFFFFF"
                            axisLine={false}
                            tickCount={4}
                            tickLine={false}
                            fontSize={12}
                            tickFormatter={yAxisTickFormatter}
                        />
                        {items.map(({ color, key }) => (
                            <Area
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={color}
                                dot={false}
                                strokeWidth={2}
                                fill={`url(#${key})`}
                            />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default GameChart
