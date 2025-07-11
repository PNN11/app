export const fillStringIn = (value: number | string, length: number, fillWith: string): string => {
    const _value = `${value}`

    return _value.padStart(length, fillWith)
}
