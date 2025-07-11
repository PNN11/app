import { FC, useEffect } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

import { useField } from 'formik'
import moment from 'moment'

import CalendarPicker from 'components/common/ui/datepicker/calendarPicker'
import TimePicker from 'components/common/ui/datepicker/timePicker'
import { isToday } from 'utils/date/isToday'

type PropsType = {
    addDuration: (date) => Date
}

const differenceBetweenStartAndStopTime = 5000

const Datepicker: FC<PropsType> = ({ addDuration }) => {
    const [startDateField, , startDateHelpers] = useField<Date>('startDate')
    const [stopDateField, , stopDateHelpers] = useField<Date>('stopDate')

    useEffect(() => {
        stopDateHelpers.setValue(addDuration(startDateField.value))
    }, [addDuration, startDateField.value])

    return (
        <>
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex w-full flex-col gap-2">
                    <span>Starting</span>
                    <CalendarPicker
                        date={startDateField.value}
                        setDate={startDateHelpers.setValue}
                        minDate={new Date()}
                    />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <span>Ending</span>
                    <CalendarPicker
                        date={stopDateField.value}
                        setDate={stopDateHelpers.setValue}
                        minDate={addDuration(startDateField.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex w-full flex-col gap-2">
                    <span>From</span>
                    <TimePicker
                        minTime={
                            isToday(startDateField.value)
                                ? new Date(Date.now() + 30000)
                                : moment({ hour: 0 }).toDate()
                        }
                        maxTime={moment({ hour: 23, minutes: 55 }).toDate()}
                        date={startDateField.value}
                        setDate={startDateHelpers.setValue}
                    />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <span>To</span>
                    <TimePicker
                        date={stopDateField.value}
                        setDate={stopDateHelpers.setValue}
                        minTime={
                            isToday(stopDateField.value)
                                ? new Date(
                                      startDateField.value.valueOf() +
                                          differenceBetweenStartAndStopTime
                                  )
                                : moment({ hour: 0 }).toDate()
                        }
                        maxTime={moment({ hour: 23, minutes: 55 }).toDate()}
                    />
                </div>
            </div>
        </>
    )
}

export default Datepicker
