import moment from 'moment/moment'

export const timeFormat = (timer: number): string => {
    return moment(timer).format('m [min] s [seconds]')
}
