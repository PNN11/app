type TLimitIntegerAndFloatDigitsParams = {
    value: string
    maxIntLength?: number
    maxFloatLength?: number
}

export const validateIntegerAndFloatDigitsLength = ({
    value,
    maxFloatLength = 8,
    maxIntLength = 11,
}: TLimitIntegerAndFloatDigitsParams): boolean => {
    const splittedValue = value.split('.')

    const integerDigitslength = splittedValue[0].length
    const floatDigitslength = splittedValue[1]?.length ?? 0

    return integerDigitslength <= maxIntLength && floatDigitslength <= maxFloatLength
}
