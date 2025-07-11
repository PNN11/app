export const isSafariBrowser = (): boolean => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}
