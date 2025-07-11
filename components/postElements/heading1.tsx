import { FC } from 'react'

import { RenderFunction } from './postElements-types'

import { THeading1 } from 'common-types/richText'

type Heading1Props = THeading1 & RenderFunction

const Heading1: FC<Heading1Props> = ({ children, renderFunction }) => {
    return (
        <h1 className="mb-2 mt-14 text-post-h1 font-medium text-base-100">
            {children.map(renderFunction)}
        </h1>
    )
}

export default Heading1
