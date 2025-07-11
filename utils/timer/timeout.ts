import moment from 'moment/moment'

export const timeout = (
    timestamp: number,
    setTimer: (value: ((prevState: number) => number) | number) => void,
    setIsTimeout: (value: ((prevState: NodeJS.Timeout) => NodeJS.Timeout) | NodeJS.Timeout) => void
): NodeJS.Timeout => {
    return setTimeout(() => {
        const a = moment(timestamp)
        const b = moment(Date.now())

        setTimer(a.diff(b).valueOf())
        setIsTimeout(null as unknown as NodeJS.Timeout)
    }, 1000)
}
