export default class Debouncer {
    timerId: NodeJS.Timeout | null

    time: number

    constructor() {
        this.timerId = null
        this.time = 500
    }

    execute(func: any, latency = this.time): void {
        if (this.timerId) clearTimeout(this.timerId)
        const timer = setTimeout(() => {
            func()
        }, latency)

        this.timerId = timer
    }
}
