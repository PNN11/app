import { FC } from 'react'

import { RenderFunction } from './postElements-types'

import { THeading2 } from 'common-types/richText'

type Heading2Props = THeading2 & RenderFunction

const Heading2: FC<Heading2Props> = ({ children, renderFunction }) => {
    return (
        <h2 className="mb-2 mt-6 text-custom-2.5xl font-medium text-base-100">
            {children.map(renderFunction)}
        </h2>
    )
}

export default Heading2
