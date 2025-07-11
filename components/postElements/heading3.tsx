import { FC } from 'react'

import { RenderFunction } from './postElements-types'

import { THeading3 } from 'common-types/richText'

type Heading3Props = THeading3 & RenderFunction

const Heading3: FC<Heading3Props> = ({ children, renderFunction }) => {
    return (
        <h3 className="mb-2 mt-6 text-xl font-semibold text-base-100">
            {children.map(renderFunction)}
        </h3>
    )
}

export default Heading3
