import { FC, useMemo } from 'react'

import { replaceWithLinks } from 'utils/replaceWithLinks/replaceWithLinks'

type Props = {
    content: string
    className?: string
}

export const Description: FC<Props> = ({ content, className }) => {
    const components = useMemo(() => replaceWithLinks(content), [content])

    return <div className={className}>{components}</div>
}
