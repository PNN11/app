export const numberFormatter = (
    price: number,
    minimumFractionDigits = 0,
    maximumFractionDigits = 18
): string => {
    const formatter = new Intl.NumberFormat('en', {
        minimumFractionDigits,
        maximumFractionDigits,
        useGrouping: false,
    })

    return formatter.format(price)
}
