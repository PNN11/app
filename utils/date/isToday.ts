export const isToday = (date: Date): boolean => {
    const now = new Date()

    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDay() === now.getDay()
    )
}
