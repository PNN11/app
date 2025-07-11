export const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) {
        return '0'
    }
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['b', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}
