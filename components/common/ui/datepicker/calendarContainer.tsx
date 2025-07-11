import { Children, FC } from 'react'

import { CalendarContainerProps } from 'react-datepicker'

export const CalendarContainer: FC<CalendarContainerProps> = ({ children }) => {
    return (
        <div className="rounded-b-2xl bg-base-800 p-2 first-child:float-none first-child:bg-transparent ">
            {Children.toArray(children).map(i => i)}
        </div>
    )
}
