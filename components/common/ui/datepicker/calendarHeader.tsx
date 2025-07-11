import { FC } from 'react'

import { format } from 'date-fns'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import CalendarArrowIcon from 'components/svg/calendarArrowIcon'

export const CalendarHeader: FC<ReactDatePickerCustomHeaderProps> = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
}) => {
    return (
        <div className="mb-3 flex flex-col gap-3 text-custom-xs">
            <div className="flex justify-between">
                <div className="text-base">{format(date, 'MMMM yyyy')}</div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className="disabled:opacity-60"
                    >
                        <CalendarArrowIcon />
                    </button>
                    <button
                        type="button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                    >
                        <CalendarArrowIcon className="rotate-180" />
                    </button>
                </div>
            </div>
        </div>
    )
}
