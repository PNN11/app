export const isIOS = (): boolean => {
    return (
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    )
}
