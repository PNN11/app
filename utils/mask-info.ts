export const maskInfo = (data: string, left: number = 4, right: number = 4): string => {
    if (!data) return ''

    const reg = new RegExp(`^(.{${left}}).*(.{${right}})$`)

    return data.replace(reg, '$1...$2')
}
