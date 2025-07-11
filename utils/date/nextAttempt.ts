export const defaultNextAttemptDelay = 91500

export const getDefaultNextAttemptTime = (): number => {
    return Date.now() + defaultNextAttemptDelay
}
