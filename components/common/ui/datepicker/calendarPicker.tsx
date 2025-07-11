import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'

import moment from 'moment'
import DatePicker from 'react-datepicker'

import { CalendarContainer } from 'components/common/ui/datepicker/calendarContainer'
import { CalendarHeader } from 'components/common/ui/datepicker/calendarHeader'
import CalendarIcon from 'components/svg/calendarIcon'
import { DropdownArrow } from 'components/svg/dropdownArrow'

type PropsType = {
    date: Date
    setDate: Dispatch<SetStateAction<Date>>
    minDate?: Date
    maxDate?: Date
}

const CalendarPicker: FC<PropsType> = ({ date, setDate, minDate = new Date(), maxDate }) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (date: Date): void => {
        setIsOpen(false)
        setDate(date)
    }
    const handleClick = (e: any): void => {
        e.preventDefault()
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const onClick = (e: any): void => {
            if (!ref.current!.contains(e.target)) setIsOpen(false)
        }

        if (isOpen) {
            document.addEventListener('click', onClick)
        } else document.removeEventListener('click', onClick)

        return () => document.removeEventListener('click', onClick)
    }, [isOpen])

    return (
        <div className="relative" ref={ref}>
            <div
                className={`flex w-full items-center justify-between gap-2 bg-base-800 p-3 ${
                    isOpen ? 'rounded-t-2xl' : 'rounded-2xl'
                }`}
                onClick={handleClick}
            >
                <div className="flex items-center gap-2">
                    <CalendarIcon />
                    {moment(date).format('DD/MM/yyyy')}
                </div>
                <DropdownArrow className={`${isOpen ? 'rotate-180' : ''} text-base-100`} />
            </div>
            {isOpen && (
                <div className="datepicker absolute top-full left-0 z-10 w-full">
                    <DatePicker
                        selected={date}
                        onChange={handleChange}
                        selectsStart
                        inline
                        weekDayClassName={() => 'day-name'}
                        calendarContainer={CalendarContainer}
                        renderCustomHeader={CalendarHeader}
                        dayClassName={() => 'day'}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </div>
            )}
        </div>
    )
}

export default CalendarPicker
