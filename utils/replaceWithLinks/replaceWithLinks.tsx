import Link from 'next/link'
const maxLoop = 10

export function replaceWithLinks(str: string) {
    let loopCount = 0

    let result = []
    let current = str
    let match

    do {
        const regex = new RegExp(`\\(([^)]+?)\\)\\s*\\[(.+?)\\]`, 'g')
        match = regex.exec(current)

        const sub = current.substring(0, match?.index)
        result.push(<span>{sub}</span>)

        current = current.substring(match?.index + match?.[0]?.length)

        if (match)
            result.push(
                <Link className="text-cta" href={match[2]}>
                    {match[1]}
                </Link>
            )

        loopCount++
    } while (match && loopCount < maxLoop)

    if (loopCount === maxLoop) throw new Error('Exceeded max loop count')

    return result
}
