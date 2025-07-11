export const isInvalidFromToFilter = (from: string, to: string): boolean => {
    return Boolean(from && to && +from > +to)
}
