export const openLink = (url: string): void => {
    const a = document.createElement('a')

    a.href = url
    a.target = '_blank'
    a.click()
}
