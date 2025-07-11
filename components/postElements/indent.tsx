import { FC } from 'react'

import { RenderFunction } from './postElements-types'

import { TIndent } from 'common-types/richText'

type IndentProps = TIndent & RenderFunction

const Indent: FC<IndentProps> = ({ children, renderFunction }) => {
    return <div className="pl-8">{children.map(renderFunction)}</div>
}

export default Indent
