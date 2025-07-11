import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'

const sec = 1000
const min = 60000
const hour = 3600000
const day = 86400000

export interface ITime extends Record<TTimeUnit, number> {}
export type TTimeUnit = 'days' | 'hours' | 'minutes' | 'seconds'
export const TimeLeftCalc = (milsec: number, hasDays?: boolean): ITime => {
    return {
        days: (hasDays ? Math.floor(milsec / day) : 0) || 0,
        hours: Math.floor((hasDays ? milsec % day : milsec) / hour) || 0,
        minutes: Math.floor((milsec % hour) / min) || 0,
        seconds: Math.floor((milsec % min) / sec) || 0,
    }
}
const getCurrentEpoch = (arr: number[]): number => {
    const ind = arr.findIndex(epoche => epoche >= Date.now())

    return ind !== -1 ? ind : Math.max(arr.length - 1, 0)
}

export const useTimers = (
    epochs: number[],
    hasDays = false,
    onTimerChanged = () => {}
): readonly [ITime, boolean, boolean] => {
    const [currentIndex, setCurrentIndex] = useState(getCurrentEpoch(epochs))
    const [timeLeft, setTimeLeft] = useState<ITime>(
        TimeLeftCalc(epochs[currentIndex] - Date.now(), hasDays)
    )

    const [loaded, setLoaded] = useState(false)
    const [ended, setEnded] = useState(epochs.every(epoch => epoch < Math.floor(Date.now())))
    const timer = useRef() as MutableRefObject<NodeJS.Timeout>

    const updateTime = useCallback(
        (index = 0) => {
            timer.current = setTimeout(() => {
                const left = TimeLeftCalc(epochs[index || currentIndex] - Date.now(), hasDays)

                setTimeLeft(left)
            }, 1000)
        },
        [currentIndex]
    )

    useEffect(() => {
        if (
            epochs[currentIndex] === 0 ||
            epochs[currentIndex] < Date.now() ||
            timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds <= 0
        ) {
            if (currentIndex + 1 <= epochs.length) {
                clearTimeout(timer.current)

                setCurrentIndex(currentIndex + 1)
                setTimeLeft(TimeLeftCalc(epochs[currentIndex + 1] - Date.now(), hasDays))
                if (currentIndex !== epochs.length - 1) onTimerChanged()
            }
        } else if (!ended) updateTime()

        if (!loaded) {
            updateTime()
            setLoaded(true)
        }

        return () => {
            clearTimeout(timer.current)
        }
    }, [timeLeft, currentIndex, updateTime, ended])

    useEffect(() => {
        if (epochs.length === currentIndex) setEnded(true)
    }, [currentIndex])

    return [timeLeft, loaded, ended] as const
}
